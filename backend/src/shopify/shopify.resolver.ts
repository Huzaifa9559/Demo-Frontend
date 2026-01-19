import { Injectable, UseGuards } from '@nestjs/common';
import { Query, Mutation, Args } from '@nestjs/graphql';
import { ShopifyService } from './shopify.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import {
  ShopifyProductsListResponse,
  ShopifyProductResponse,
  ShopifyProductsListInput,
  ShopifyProductInput,
  ShopifyProductsSearchInput,
  ShopifyCreateProductInput,
  ShopifyUpdateProductInput,
  ShopifyDeleteProductInput,
  ShopifyMutationResponse,
} from './shopify.graphql.types';

/**
 * Shopify GraphQL Resolver
 * Exposes Shopify data through GraphQL API
 */
@Injectable()
export class ShopifyResolver {
  constructor(private readonly shopifyService: ShopifyService) {}

  @Query()
  @UseGuards(JwtAuthGuard)
  async shopifyProductsList(
    @Args('input') input: ShopifyProductsListInput,
  ): Promise<ShopifyProductsListResponse> {
    return await this.shopifyService.listProducts(
      input.shopDomain,
      input.first || 50,
      input.after,
    );
  }

  @Query()
  @UseGuards(JwtAuthGuard)
  async shopifyProduct(
    @Args('input') input: ShopifyProductInput,
  ): Promise<ShopifyProductResponse> {
    return await this.shopifyService.getProduct(
      input.productId,
      input.shopDomain,
    );
  }

  @Query()
  @UseGuards(JwtAuthGuard)
  async shopifyProductsSearch(
    @Args('input') input: ShopifyProductsSearchInput,
  ): Promise<ShopifyProductsListResponse> {
    return await this.shopifyService.searchProducts(
      input.query,
      input.shopDomain,
      input.first || 50,
      input.after,
    );
  }

  @Mutation()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async shopifyCreateProduct(
    @Args('input') input: ShopifyCreateProductInput,
  ): Promise<ShopifyMutationResponse> {
    return await this.shopifyService.createProduct(
      {
        title: input.title,
        handle: input.handle,
        description: input.description,
        vendor: input.vendor,
        productType: input.productType,
        tags: input.tags,
        status: input.status,
      },
      input.shopDomain,
    );
  }

  @Mutation()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async shopifyUpdateProduct(
    @Args('input') input: ShopifyUpdateProductInput,
  ): Promise<ShopifyMutationResponse> {
    return await this.shopifyService.updateProduct(
      input.productId,
      {
        title: input.title,
        handle: input.handle,
        description: input.description,
        vendor: input.vendor,
        productType: input.productType,
        tags: input.tags,
        status: input.status,
      },
      input.shopDomain,
    );
  }

  @Mutation()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async shopifyDeleteProduct(
    @Args('input') input: ShopifyDeleteProductInput,
  ): Promise<ShopifyMutationResponse> {
    return await this.shopifyService.deleteProduct(
      input.productId,
      input.shopDomain,
    );
  }
}
