import { ObjectType, Field } from '@nestjs/graphql';

export interface ValidationError {
  field: string;
  constraints?: Record<string, string>;
  messages: string[];
}

@ObjectType()
export class GraphQLErrorType {
  @Field()
  message: string;

  @Field()
  code: string;

  @Field(() => [String], { nullable: true })
  path?: string[];

  @Field(() => [GraphQLValidationErrorType], { nullable: true })
  validationErrors?: GraphQLValidationErrorType[];

  @Field({ nullable: true })
  statusCode?: number;
}

@ObjectType()
export class GraphQLValidationErrorType {
  @Field()
  field: string;

  @Field(() => [String], { nullable: true })
  messages: string[];

  @Field(() => String, { nullable: true })
  constraints?: string;
}

@ObjectType()
export class GraphQLSuccessResponse<T = any> {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  message?: string;

  @Field({ nullable: true })
  data?: T;
}

@ObjectType()
export class GraphQLErrorResponse {
  @Field()
  success: boolean;

  @Field(() => GraphQLErrorType, { nullable: true })
  error?: GraphQLErrorType;

  @Field({ nullable: true })
  data?: null;
}
