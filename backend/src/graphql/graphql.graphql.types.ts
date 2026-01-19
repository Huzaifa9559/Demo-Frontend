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
  DateTime: { input: Date; output: Date; }
  Email: { input: string; output: string; }
  NonEmptyString: { input: string; output: string; }
  NonNegativeInt: { input: number; output: number; }
  Password: { input: string; output: string; }
};

export type AuthPayload = {
  token: Scalars['String']['output'];
  user: User;
};

export type CreateProjectInput = {
  dueDate: Scalars['DateTime']['input'];
  name: Scalars['NonEmptyString']['input'];
  owner: Scalars['NonEmptyString']['input'];
  projectCode: Scalars['NonEmptyString']['input'];
  status: ProjectStatus;
  tickets: Scalars['NonNegativeInt']['input'];
};

export type CreateResourceInput = {
  author?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ResourceStatus>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['NonEmptyString']['input'];
  type: ResourceType;
  url: Scalars['NonEmptyString']['input'];
};

export type LoginInput = {
  email: Scalars['Email']['input'];
  password: Scalars['NonEmptyString']['input'];
};

export type Mutation = {
  createProject: Project;
  createResource: Resource;
  deleteProject: Scalars['Boolean']['output'];
  deleteResource: Scalars['Boolean']['output'];
  login: AuthPayload;
  requestOtp: RequestOtpResponse;
  resetPassword: ResetPasswordResponse;
  shopifyCreateProduct: ShopifyMutationResponse;
  shopifyDeleteProduct: ShopifyMutationResponse;
  shopifyUpdateProduct: ShopifyMutationResponse;
  signup: AuthPayload;
  updateProject: Project;
  updateResource: Resource;
  verifyOtp: VerifyOtpResponse;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationCreateResourceArgs = {
  input: CreateResourceInput;
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteResourceArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRequestOtpArgs = {
  input: RequestOtpInput;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
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


export type MutationSignupArgs = {
  input: SignupInput;
};


export type MutationUpdateProjectArgs = {
  id: Scalars['ID']['input'];
  input: UpdateProjectInput;
};


export type MutationUpdateResourceArgs = {
  id: Scalars['ID']['input'];
  input: UpdateResourceInput;
};


export type MutationVerifyOtpArgs = {
  input: VerifyOtpInput;
};

export type PaginationMeta = {
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  page: Scalars['Int']['output'];
  take: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Project = {
  createdAt: Scalars['DateTime']['output'];
  dueDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  owner: Scalars['String']['output'];
  projectCode: Scalars['String']['output'];
  status: ProjectStatus;
  tickets: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

/** Project status enum */
export type ProjectStatus =
  | 'BLOCKED'
  | 'COMPLETED'
  | 'IN_PROGRESS'
  | 'ON_HOLD';

export type ProjectsOutput = {
  data: Array<Project>;
  meta: PaginationMeta;
};

export type ProjectsQueryInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  range?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ProjectStatus>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  me: User;
  project: Project;
  projects: ProjectsOutput;
  resource: Resource;
  resources: ResourcesOutput;
  shopifyProduct: ShopifyProductResponse;
  shopifyProductsList: ShopifyProductsListResponse;
  shopifyProductsSearch: ShopifyProductsListResponse;
};


export type QueryProjectArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProjectsArgs = {
  input?: InputMaybe<ProjectsQueryInput>;
};


export type QueryResourceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryResourcesArgs = {
  input?: InputMaybe<ResourcesQueryInput>;
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

export type RequestOtpInput = {
  email: Scalars['Email']['input'];
};

export type RequestOtpResponse = {
  message: Scalars['String']['output'];
  otp?: Maybe<Scalars['String']['output']>;
};

export type ResetPasswordInput = {
  email: Scalars['Email']['input'];
  newPassword: Scalars['Password']['input'];
  otp: Scalars['NonEmptyString']['input'];
};

export type ResetPasswordResponse = {
  message: Scalars['String']['output'];
};

export type Resource = {
  author?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  key: Scalars['ID']['output'];
  status: ResourceStatus;
  tags: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  type: ResourceType;
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type ResourceSortBy =
  | 'createdAt'
  | 'title'
  | 'type';

/** Resource status enum */
export type ResourceStatus =
  | 'active'
  | 'archived';

/** Resource type enum */
export type ResourceType =
  | 'document'
  | 'file'
  | 'image'
  | 'link'
  | 'other'
  | 'video';

export type ResourcesOutput = {
  data: Array<Resource>;
  meta: PaginationMeta;
};

export type ResourcesQueryInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<ResourceSortBy>;
  sortOrder?: InputMaybe<SortOrder>;
  status?: InputMaybe<ResourceStatus>;
  tag?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ResourceType>;
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

export type SignupInput = {
  email: Scalars['Email']['input'];
  name: Scalars['NonEmptyString']['input'];
  password: Scalars['Password']['input'];
  role: UserRole;
};

export type SortOrder =
  | 'asc'
  | 'desc';

export type UpdateProjectInput = {
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['NonEmptyString']['input']>;
  owner?: InputMaybe<Scalars['NonEmptyString']['input']>;
  projectCode?: InputMaybe<Scalars['NonEmptyString']['input']>;
  status?: InputMaybe<ProjectStatus>;
  tickets?: InputMaybe<Scalars['NonNegativeInt']['input']>;
};

export type UpdateResourceInput = {
  author?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ResourceStatus>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['NonEmptyString']['input']>;
  type?: InputMaybe<ResourceType>;
  url?: InputMaybe<Scalars['NonEmptyString']['input']>;
};

export type User = {
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  role: UserRole;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

/** User role enum */
export type UserRole =
  | 'admin'
  | 'user';

export type VerifyOtpInput = {
  email: Scalars['Email']['input'];
  otp: Scalars['NonEmptyString']['input'];
};

export type VerifyOtpResponse = {
  message: Scalars['String']['output'];
};
