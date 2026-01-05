import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import {
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../../users/users.service';
import {
  UserType,
  LoginResponseType,
  LoginInput,
  SignupInput,
} from '../types/user.types';
import {
  CurrentUser,
  CurrentUserPayload,
} from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Resolver(() => UserType)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => LoginResponseType)
  async login(@Args('input') input: LoginInput) {
    return await this.authService.login(input);
  }

  @Mutation(() => LoginResponseType)
  async signup(@Args('input') input: SignupInput) {
    return await this.authService.signup(input);
  }

  @Query(() => UserType)
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: CurrentUserPayload) {
    const userEntity = await this.usersService.findOne(user.sub);
    if (!userEntity) {
      throw new NotFoundException('User not found');
    }
    return {
      id: userEntity.id,
      email: userEntity.email,
      name: userEntity.name,
      role: userEntity.role,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
    };
  }
}
