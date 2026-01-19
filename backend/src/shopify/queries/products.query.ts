/**
 * Shared GraphQL queries for Shopify products
 * These queries call Shopify's GraphQL API directly (backend -> Shopify)
 * Uses Shopify API fragments (Product type)
 */

import { 
  PRODUCT_BASIC_FIELDS_FRAGMENT,
  PRODUCT_EXTENDED_FIELDS_FRAGMENT,
  PRODUCT_CONNECTION_FIELDS 
} from '../fragments/shopify-product.fragment';

/**
 * Query to list products with pagination
 * Used by backend to call Shopify API directly
 */
export const LIST_PRODUCTS_QUERY = `
  ${PRODUCT_BASIC_FIELDS_FRAGMENT}
  ${PRODUCT_EXTENDED_FIELDS_FRAGMENT}
  query ListProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      ${PRODUCT_CONNECTION_FIELDS}
    }
  }
`;

/**
 * Query to get a single product by ID
 * Used by backend to call Shopify API directly
 */
export const GET_PRODUCT_QUERY = `
  ${PRODUCT_BASIC_FIELDS_FRAGMENT}
  ${PRODUCT_EXTENDED_FIELDS_FRAGMENT}
  query GetProduct($id: ID!) {
    product(id: $id) {
      ...ProductExtendedFields
    }
  }
`;

/**
 * Query to search products
 * Used by backend to call Shopify API directly
 */
export const SEARCH_PRODUCTS_QUERY = `
  ${PRODUCT_BASIC_FIELDS_FRAGMENT}
  ${PRODUCT_EXTENDED_FIELDS_FRAGMENT}
  query SearchProducts($query: String!, $first: Int!, $after: String) {
    products(first: $first, after: $after, query: $query) {
      ${PRODUCT_CONNECTION_FIELDS}
    }
  }
`;

/**
 * Exported as object for backward compatibility with backend
 */
export const PRODUCTS_QUERIES = {
  LIST_PRODUCTS: LIST_PRODUCTS_QUERY,
  GET_PRODUCT: GET_PRODUCT_QUERY,
  SEARCH_PRODUCTS: SEARCH_PRODUCTS_QUERY,
};
