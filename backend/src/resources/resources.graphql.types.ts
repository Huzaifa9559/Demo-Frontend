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
  NonEmptyString: { input: string; output: string; }
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

export type Mutation = {
  createResource: Resource;
  deleteResource: Scalars['Boolean']['output'];
  updateResource: Resource;
};


export type MutationCreateResourceArgs = {
  input: CreateResourceInput;
};


export type MutationDeleteResourceArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateResourceArgs = {
  id: Scalars['ID']['input'];
  input: UpdateResourceInput;
};

export type PaginationMeta = {
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  page: Scalars['Int']['output'];
  take: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Query = {
  resource: Resource;
  resources: ResourcesOutput;
};


export type QueryResourceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryResourcesArgs = {
  input?: InputMaybe<ResourcesQueryInput>;
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

export type ResourceSortBy =
  | 'createdAt'
  | 'title'
  | 'type';

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

export type SortOrder =
  | 'asc'
  | 'desc';

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
