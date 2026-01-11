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
  Password: { input: string; output: string; }
};

export type AuthPayload = {
  token: Scalars['String']['output'];
  user: User;
};

export type LoginInput = {
  email: Scalars['Email']['input'];
  password: Scalars['NonEmptyString']['input'];
};

export type Mutation = {
  login: AuthPayload;
  signup: AuthPayload;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationSignupArgs = {
  input: SignupInput;
};

export type Query = {
  me: User;
};

export type SignupInput = {
  email: Scalars['Email']['input'];
  name: Scalars['NonEmptyString']['input'];
  password: Scalars['Password']['input'];
  role: UserRole;
};

export type User = {
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  role: UserRole;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UserRole =
  | 'admin'
  | 'user';
