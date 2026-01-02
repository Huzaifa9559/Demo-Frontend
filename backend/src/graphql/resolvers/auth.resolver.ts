import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../../users/users.service';
import { LoginDto } from '../../auth/dto/login.dto';
import { SignupDto } from '../../auth/dto/signup.dto';
import { UserType, LoginResponseType, LoginInput, SignupInput } from '../types/user.types';
import { CurrentUser, CurrentUserPayload } from '../../common/decorators/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Resolver(() => UserType)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => LoginResponseType)
  async login(@Args('input') input: LoginInput) {
    return await this.authService.login(input as LoginDto);
  }

  @Mutation(() => LoginResponseType)
  async signup(@Args('input') input: SignupInput) {
    console.log(input);
    //return await this.authService.signup(input as SignupDto);
  }

  @Query(() => UserType)
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: CurrentUserPayload) {
    const userEntity = await this.usersService.findOne(user.sub);
    if (!userEntity) {
      throw new Error('User not found');
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

