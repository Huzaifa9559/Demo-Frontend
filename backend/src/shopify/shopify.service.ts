import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse, AxiosError, isAxiosError } from 'axios';
import { TokenCacheHelper } from './helpers/token-cache.helper';
import { PRODUCTS_QUERIES } from './queries/products.query';
import { PRODUCTS_MUTATIONS } from './mutations/products.mutation';

/**
 * Response types for Shopify GraphQL API
 */
export interface ShopifyGraphQLResponse<T> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: Array<string | number>;
  }>;
}

export interface ShopifyAccessTokenResponse {
  access_token: string;
  expires_in: number;
  scope?: string;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  status: string;
  totalInventory: number;
  featuredImage?: {
    url: string;
    altText?: string;
  };
  description?: string;
  productType?: string;
  vendor?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ShopifyProductsListResponse {
  products: {
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
    edges: Array<{
      node: ShopifyProduct;
    }>;
  };
}

export interface ShopifyProductResponse {
  product: ShopifyProduct;
}

/**
 * Main Shopify service that handles all Shopify API interactions
 * Includes authentication, token management, and GraphQL operations
 */
@Injectable()
export class ShopifyService {
  private readonly tokenCache: TokenCacheHelper;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.tokenCache = new TokenCacheHelper();
  }

  /**
   * Get default shop domain from config or use provided one
   */
  private getShopDomain(shopDomain?: string): string {
    const domain =
      shopDomain ||
      this.configService.get<string>('shopify.defaultShopDomain');

    if (!domain) {
      throw new Error(
        'Shop domain is required. Provide it as parameter or set SHOPIFY_SHOP_DOMAIN in environment variables',
      );
    }

    return domain;
  }

  /**
   * Request a new access token from Shopify (bypasses cache)
   * @param shopDomain - Shopify shop domain
   * @returns Access token
   */
  private async requestNewAccessToken(shopDomain: string): Promise<string> {
    const clientId = this.configService.get<string>('shopify.clientId');
    const clientSecret = this.configService.get<string>('shopify.clientSecret');

    if (!clientId || !clientSecret) {
      throw new Error(
        'Missing SHOPIFY_CLIENT_ID or SHOPIFY_CLIENT_SECRET in environment variables',
      );
    }

    const url = `https://${shopDomain}/admin/oauth/access_token`;
    const scopes = this.configService.get<string>('shopify.scopes');
    
    // Build request body - match the curl command format exactly
    const bodyParams: Record<string, string> = {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    };
    
    // Add scope if provided (Shopify may require this for products access)
    if (scopes) {
      bodyParams.scope = scopes;
    }
    
    const body = new URLSearchParams(bodyParams);

    try {
      const response: AxiosResponse<ShopifyAccessTokenResponse> =
        await firstValueFrom(
          this.httpService.post<ShopifyAccessTokenResponse>(
            url,
            body.toString(),
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            },
          ),
        );

      const token = response.data?.access_token;
      const expiresIn = response.data?.expires_in ?? 3600;

      if (!token) {
        throw new Error(
          `Token response missing access_token: ${JSON.stringify(response.data)}`,
        );
      }

      return token;
    } catch (error: any) {
      const errorMessage = error.response?.data 
        ? JSON.stringify(error.response.data)
        : error.message;
      throw new Error(
        `Failed to get Shopify access token: ${errorMessage}`,
      );
    }
  }

  /**
   * Get access token for a shop domain with caching
   * @param shopDomain - Shopify shop domain (e.g., 'myshop.myshopify.com')
   * @returns Access token
   */
  private async getAccessToken(shopDomain: string): Promise<string> {
    // Check cache first
    const cachedToken = this.tokenCache.get(shopDomain);
    if (cachedToken) {
      return cachedToken;
    }

    // Request new token
    const token = await this.requestNewAccessToken(shopDomain);
    
    // Get expiration from response (default to 1 hour)
    const expiresIn = 3600;
    
    // Cache the token
    this.tokenCache.set(shopDomain, token, expiresIn);

    return token;
  }

  /**
   * Get access token without using cache (forces new request)
   * @param shopDomain - Shopify shop domain
   * @returns Access token
   */
  private async getAccessTokenWithoutCache(shopDomain: string): Promise<string> {
    const token = await this.requestNewAccessToken(shopDomain);
    const expiresIn = 3600;
    this.tokenCache.set(shopDomain, token, expiresIn);
    return token;
  }

  /**
   * Clear token cache for a shop domain
   * Useful when tokens need to be refreshed manually
   * @param shopDomain - Optional shop domain, if not provided clears all
   */
  clearCache(shopDomain?: string): void {
    this.tokenCache.clear(shopDomain);
  }

  /**
   * Execute a GraphQL query/mutation against Shopify Admin API
   * @param shopDomain - Shopify shop domain
   * @param query - GraphQL query or mutation string
   * @param variables - GraphQL variables
   * @returns GraphQL response data
   */
  private async executeGraphQL<T>(
    shopDomain: string,
    query: string,
    variables?: Record<string, any>,
  ): Promise<T> {
    const token = await this.getAccessToken(shopDomain);
    const apiVersion =
      this.configService.get<string>('shopify.adminApiVersion') || '2026-01';
    const url = `https://${shopDomain}/admin/api/${apiVersion}/graphql.json`;

    try {
      const response: AxiosResponse<ShopifyGraphQLResponse<T>> =
        await firstValueFrom(
          this.httpService.post<ShopifyGraphQLResponse<T>>(
            url,
            { query, variables },
            {
              headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': token,
              },
            },
          ),
        );

      if (response.data?.errors) {
        // Check if error is ACCESS_DENIED - clear cache and retry once
        const hasAccessDenied = response.data.errors.some(
          (error: any) => error.extensions?.code === 'ACCESS_DENIED',
        );

        if (hasAccessDenied) {
          // Clear cache to force new token request with scopes
          this.tokenCache.clear(shopDomain);
          
          // Force a new token request (bypass cache)
          const freshToken = await this.getAccessTokenWithoutCache(shopDomain);
          const retryResponse: AxiosResponse<ShopifyGraphQLResponse<T>> =
            await firstValueFrom(
              this.httpService.post<ShopifyGraphQLResponse<T>>(
                url,
                { query, variables },
                {
                  headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': freshToken,
                  },
                },
              ),
            );

          if (retryResponse.data?.errors) {
            throw new Error(
              `Shopify GraphQL errors: ${JSON.stringify(retryResponse.data.errors)}`,
            );
          }

          if (!retryResponse.data?.data) {
            throw new Error(
              `Shopify GraphQL response missing data: ${JSON.stringify(retryResponse.data)}`,
            );
          }

          return retryResponse.data.data;
        }

        throw new Error(
          `Shopify GraphQL errors: ${JSON.stringify(response.data.errors)}`,
        );
      }

      if (!response.data?.data) {
        throw new Error(
          `Shopify GraphQL response missing data: ${JSON.stringify(response.data)}`,
        );
      }

      return response.data.data;
    } catch (error: unknown) {
      // Handle Axios errors from NestJS HttpService
      // NestJS HttpService throws AxiosError when using firstValueFrom
      if (isAxiosError(error)) {
        const axiosError = error as AxiosError<unknown>;
        // Check for response data first (most specific error)
        if (axiosError.response?.data) {
          const errorData = axiosError.response.data;
          const errorMessage = typeof errorData === 'string' 
            ? errorData 
            : (errorData as any)?.message || JSON.stringify(errorData);
          throw new Error(`Shopify API error: ${errorMessage}`);
        }
        // Check for request errors (network issues, timeouts, etc.)
        if (axiosError.request && !axiosError.response) {
          throw new Error(`Shopify API request failed: No response received. ${axiosError.message || 'Network error'}`);
        }
        // Use Axios error message or code
        if (axiosError.message) {
          throw new Error(`Shopify API request failed: ${axiosError.message}`);
        }
        if (axiosError.code) {
          throw new Error(`Shopify API request failed: ${axiosError.code}`);
        }
        throw new Error('Shopify API request failed: Unknown Axios error');
      }
      
      // Handle standard Error instances
      if (error instanceof Error) {
        throw new Error(`Failed to execute Shopify GraphQL: ${error.message}`);
      }
      
      // Handle string errors
      if (typeof error === 'string') {
        throw new Error(`Failed to execute Shopify GraphQL: ${error}`);
      }
      
      // Handle unknown error types - try to stringify safely
      try {
        const errorMessage = JSON.stringify(error);
        throw new Error(`Failed to execute Shopify GraphQL: ${errorMessage}`);
      } catch {
        throw new Error('Failed to execute Shopify GraphQL: Unknown error occurred');
      }
    }
  }

  /**
   * List all products with pagination support
   * @param shopDomain - Optional shop domain (uses default if not provided)
   * @param first - Number of products per page
   * @param after - Cursor for pagination
   * @returns Products list with pagination metadata
   */
  async listProducts(shopDomain?: string, first = 50, after?: string) {
    const domain = this.getShopDomain(shopDomain);
    return this.executeGraphQL<ShopifyProductsListResponse>(
      domain,
      PRODUCTS_QUERIES.LIST_PRODUCTS,
      { first, after },
    );
  }

  /**
   * Get a single product by ID
   * @param productId - Shopify product ID (GID format: gid://shopify/Product/123456)
   * @param shopDomain - Optional shop domain
   * @returns Product details
   */
  async getProduct(productId: string, shopDomain?: string) {
    const domain = this.getShopDomain(shopDomain);
    return this.executeGraphQL<ShopifyProductResponse>(
      domain,
      PRODUCTS_QUERIES.GET_PRODUCT,
      { id: productId },
    );
  }

  /**
   * Search products by query
   * @param query - Search query string
   * @param shopDomain - Optional shop domain
   * @param first - Number of results per page
   * @param after - Cursor for pagination
   * @returns Products matching the search query
   */
  async searchProducts(
    query: string,
    shopDomain?: string,
    first = 50,
    after?: string,
  ) {
    const domain = this.getShopDomain(shopDomain);
    return this.executeGraphQL<ShopifyProductsListResponse>(
      domain,
      PRODUCTS_QUERIES.SEARCH_PRODUCTS,
      { query, first, after },
    );
  }

  /**
   * Create a new product
   * @param input - Product creation data
   * @param shopDomain - Optional shop domain
   * @returns Created product
   */
  async createProduct(
    input: {
      title: string;
      handle?: string;
      description?: string;
      vendor?: string;
      productType?: string;
      tags?: string[];
      status?: string;
    },
    shopDomain?: string,
  ) {
    const domain = this.getShopDomain(shopDomain);
    
    // Build Shopify product input
    const productInput: any = {
      title: input.title,
    };

    if (input.handle) {
      productInput.handle = input.handle;
    }
    if (input.description) {
      productInput.descriptionHtml = input.description;
    }
    if (input.vendor) {
      productInput.vendor = input.vendor;
    }
    if (input.productType) {
      productInput.productType = input.productType;
    }
    if (input.tags && input.tags.length > 0) {
      productInput.tags = input.tags;
    }
    if (input.status) {
      productInput.status = input.status.toUpperCase();
    }

    try {
      const result = await this.executeGraphQL<any>(
        domain,
        PRODUCTS_MUTATIONS.CREATE_PRODUCT,
        { input: productInput },
      );

      if (result.productCreate?.userErrors?.length > 0) {
        throw new Error(
          `Shopify errors: ${JSON.stringify(result.productCreate.userErrors)}`,
        );
      }

      return {
        success: true,
        product: result.productCreate?.product,
        message: 'Product created successfully',
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to create product',
        product: null,
      };
    }
  }

  /**
   * Update an existing product
   * @param productId - Shopify product ID
   * @param input - Product update data
   * @param shopDomain - Optional shop domain
   * @returns Updated product
   */
  async updateProduct(
    productId: string,
    input: {
      title?: string;
      handle?: string;
      description?: string;
      vendor?: string;
      productType?: string;
      tags?: string[];
      status?: string;
    },
    shopDomain?: string,
  ) {
    const domain = this.getShopDomain(shopDomain);
    
    // Build Shopify product input
    const productInput: any = {
      id: productId,
    };

    if (input.title) {
      productInput.title = input.title;
    }
    if (input.handle !== undefined) {
      productInput.handle = input.handle || '';
    }
    if (input.description !== undefined) {
      productInput.descriptionHtml = input.description || '';
    }
    if (input.vendor !== undefined) {
      productInput.vendor = input.vendor || '';
    }
    if (input.productType !== undefined) {
      productInput.productType = input.productType || '';
    }
    if (input.tags !== undefined) {
      productInput.tags = input.tags || [];
    }
    if (input.status) {
      productInput.status = input.status.toUpperCase();
    }

    // Shopify requires the product ID to be inside the input object
    const shopifyInput = {
      id: productId,
      ...productInput,
    };

    try {
      const result = await this.executeGraphQL<any>(
        domain,
        PRODUCTS_MUTATIONS.UPDATE_PRODUCT,
        { input: shopifyInput },
      );

      if (result.productUpdate?.userErrors?.length > 0) {
        throw new Error(
          `Shopify errors: ${JSON.stringify(result.productUpdate.userErrors)}`,
        );
      }

      return {
        success: true,
        product: result.productUpdate?.product,
        message: 'Product updated successfully',
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to update product',
        product: null,
      };
    }
  }

  /**
   * Delete a product
   * @param productId - Shopify product ID
   * @param shopDomain - Optional shop domain
   * @returns Deletion result
   */
  async deleteProduct(productId: string, shopDomain?: string) {
    const domain = this.getShopDomain(shopDomain);

    // Shopify requires the product ID to be inside the input object
    const deleteInput = {
      id: productId,
    };

    try {
      const result = await this.executeGraphQL<any>(
        domain,
        PRODUCTS_MUTATIONS.DELETE_PRODUCT,
        { input: deleteInput },
      );

      if (result.productDelete?.userErrors?.length > 0) {
        throw new Error(
          `Shopify errors: ${JSON.stringify(result.productDelete.userErrors)}`,
        );
      }

      return {
        success: true,
        message: 'Product deleted successfully',
        product: null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to delete product',
        product: null,
      };
    }
  }
}
