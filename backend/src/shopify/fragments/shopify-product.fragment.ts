/**
 * GraphQL fragments for Shopify's Product type
 * Used when backend calls Shopify's GraphQL API directly (backend -> Shopify)
 * 
 * Type: Product (Shopify's native GraphQL type)
 */

/**
 * Basic product fields fragment for Shopify API
 * Type: Product (Shopify's native type)
 */
export const PRODUCT_BASIC_FIELDS_FRAGMENT = `
  fragment ProductBasicFields on Product {
    id
    title
    handle
    status
    totalInventory
    featuredImage {
      url
      altText
    }
    description
    productType
    vendor
    tags
    createdAt
    updatedAt
  }
`;

/**
 * Extended product fields fragment for Shopify API (includes images and variants)
 * Type: Product (Shopify's native type)
 */
export const PRODUCT_EXTENDED_FIELDS_FRAGMENT = `
  fragment ProductExtendedFields on Product {
    ...ProductBasicFields
    images(first: 10) {
      edges {
        node {
          url
          altText
        }
      }
    }
    variants(first: 50) {
      edges {
        node {
          id
          title
          price
          sku
          inventoryQuantity
          availableForSale
        }
      }
    }
  }
`;

/**
 * Product connection fields fragment for Shopify API (for pagination)
 * Uses ProductExtendedFields fragment
 */
export const PRODUCT_CONNECTION_FIELDS = `
  pageInfo {
    hasNextPage
    endCursor
  }
  edges {
    node {
      ...ProductExtendedFields
    }
  }
`;
