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

export type LoginInput = {
  email: Scalars['Email']['input'];
  password: Scalars['NonEmptyString']['input'];
};

export type Mutation = {
  createProject: Project;
  deleteProject: Scalars['Boolean']['output'];
  login: AuthPayload;
  requestOtp: RequestOtpResponse;
  resetPassword: ResetPasswordResponse;
  signup: AuthPayload;
  updateProject: Project;
  verifyOtp: VerifyOtpResponse;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationDeleteProjectArgs = {
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


export type MutationSignupArgs = {
  input: SignupInput;
};


export type MutationUpdateProjectArgs = {
  id: Scalars['ID']['input'];
  input: UpdateProjectInput;
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
};


export type QueryProjectArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProjectsArgs = {
  input?: InputMaybe<ProjectsQueryInput>;
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

export type SignupInput = {
  email: Scalars['Email']['input'];
  name: Scalars['NonEmptyString']['input'];
  password: Scalars['Password']['input'];
  role: UserRole;
};

export type UpdateProjectInput = {
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['NonEmptyString']['input']>;
  owner?: InputMaybe<Scalars['NonEmptyString']['input']>;
  projectCode?: InputMaybe<Scalars['NonEmptyString']['input']>;
  status?: InputMaybe<ProjectStatus>;
  tickets?: InputMaybe<Scalars['NonNegativeInt']['input']>;
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
