export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  shopifyCreateProduct: ShopifyMutationResponse;
  shopifyDeleteProduct: ShopifyMutationResponse;
  shopifyUpdateProduct: ShopifyMutationResponse;
};


export type MutationShopifyCreateProductArgs = {
  input: ShopifyCreateProductInput;
};


export type MutationShopifyDeleteProductArgs = {
  input: ShopifyDeleteProductInput;
};


export type MutationShopifyUpdateProductArgs = {
  input: ShopifyUpdateProductInput;
};

export type Query = {
  shopifyProduct: ShopifyProductResponse;
  shopifyProductsList: ShopifyProductsListResponse;
  shopifyProductsSearch: ShopifyProductsListResponse;
};


export type QueryShopifyProductArgs = {
  input: ShopifyProductInput;
};


export type QueryShopifyProductsListArgs = {
  input: ShopifyProductsListInput;
};


export type QueryShopifyProductsSearchArgs = {
  input: ShopifyProductsSearchInput;
};

export type ShopifyCreateProductInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  handle?: InputMaybe<Scalars['String']['input']>;
  productType?: InputMaybe<Scalars['String']['input']>;
  shopDomain?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
  vendor?: InputMaybe<Scalars['String']['input']>;
};

export type ShopifyDeleteProductInput = {
  productId: Scalars['ID']['input'];
  shopDomain?: InputMaybe<Scalars['String']['input']>;
};

export type ShopifyMutationResponse = {
  message?: Maybe<Scalars['String']['output']>;
  product?: Maybe<ShopifyProduct>;
  success: Scalars['Boolean']['output'];
};

export type ShopifyPageInfo = {
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
};

export type ShopifyProduct = {
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  featuredImage?: Maybe<ShopifyProductImage>;
  handle: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  productType?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  tags?: Maybe<Array<Scalars['String']['output']>>;
  title: Scalars['String']['output'];
  totalInventory: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  vendor?: Maybe<Scalars['String']['output']>;
};

export type ShopifyProductEdge = {
  node: ShopifyProduct;
};

export type ShopifyProductImage = {
  altText?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
};

export type ShopifyProductInput = {
  productId: Scalars['ID']['input'];
  shopDomain?: InputMaybe<Scalars['String']['input']>;
};

export type ShopifyProductResponse = {
  product: ShopifyProduct;
};

export type ShopifyProductsConnection = {
  edges: Array<ShopifyProductEdge>;
  pageInfo: ShopifyPageInfo;
};

export type ShopifyProductsListInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  shopDomain?: InputMaybe<Scalars['String']['input']>;
};

export type ShopifyProductsListResponse = {
  products: ShopifyProductsConnection;
};

export type ShopifyProductsSearchInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
  shopDomain?: InputMaybe<Scalars['String']['input']>;
};

export type ShopifyUpdateProductInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  handle?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['ID']['input'];
  productType?: InputMaybe<Scalars['String']['input']>;
  shopDomain?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
  vendor?: InputMaybe<Scalars['String']['input']>;
};
