import { ObjectType, Field, InputType, registerEnumType } from '@nestjs/graphql';
import { UserRole } from '../../users/entities/user.entity';

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'User role enum',
});

@ObjectType()
export class UserType {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field(() => UserRole)
  role: UserRole;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}

@ObjectType()
export class LoginResponseType {
  @Field(() => UserType)
  user: UserType;

  @Field()
  token: string;
}

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

// @InputType()
export class SignupInput {
  // @Field()
  email: string;

  // @Field()
  password: string;

  // @Field()
  name: string;

  // @Field(() => UserRole)
  // role: UserRole;
}

