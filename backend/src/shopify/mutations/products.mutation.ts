/**
 * Shared GraphQL mutations for Shopify products
 * These mutations call Shopify's GraphQL API directly (backend -> Shopify)
 * Uses Shopify API fragments (Product type)
 */

import { PRODUCT_BASIC_FIELDS_FRAGMENT } from '../fragments/shopify-product.fragment';

/**
 * Mutation to create a new product
 */
export const CREATE_PRODUCT_MUTATION = `
  ${PRODUCT_BASIC_FIELDS_FRAGMENT}
  mutation CreateProduct($input: ProductInput!) {
    productCreate(input: $input) {
      product {
        ...ProductBasicFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;

/**
 * Mutation to update an existing product
 * Note: Shopify's productUpdate takes id inside the input object
 */
export const UPDATE_PRODUCT_MUTATION = `
  ${PRODUCT_BASIC_FIELDS_FRAGMENT}
  mutation UpdateProduct($input: ProductInput!) {
    productUpdate(input: $input) {
      product {
        ...ProductBasicFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;

/**
 * Mutation to delete a product
 * Note: Shopify's productDelete takes id inside the input object
 */
export const DELETE_PRODUCT_MUTATION = `mutation DeleteProduct($input: ProductDeleteInput!) {
  productDelete(input: $input) {
    deletedProductId
    userErrors {
      field
      message
    }
  }
}`;

/**
 * Exported as object for backward compatibility with backend
 */
export const PRODUCTS_MUTATIONS = {
  CREATE_PRODUCT: CREATE_PRODUCT_MUTATION,
  UPDATE_PRODUCT: UPDATE_PRODUCT_MUTATION,
  DELETE_PRODUCT: DELETE_PRODUCT_MUTATION,
};
