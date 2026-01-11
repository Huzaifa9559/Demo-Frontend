import { Injectable, UseGuards, NotFoundException } from '@nestjs/common';
import { Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { LoginInput, SignupInput, User } from './auth.graphql.types';
import { UserRole } from '../users/entities/user.entity';

// SDL first approach - Thin resolver that delegates to service layer
@Injectable()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation()
  async login(@Args('input') input: LoginInput) {
    return await this.authService.login(input);
  }

  @Mutation()
  async signup(@Args('input') input: SignupInput) {
    return await this.authService.signup(input);
  }

  @Query()
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: CurrentUserPayload): Promise<User> {
    const userEntity = await this.usersService.findOne(user.sub);
    if (!userEntity) {
      throw new NotFoundException('User not found');
    }
    // Map entity UserRole (ADMIN/USER) to GraphQL UserRole (admin/user)
    const graphqlRole = userEntity.role === UserRole.ADMIN ? 'admin' : 'user';
    return {
      id: userEntity.id,
      email: userEntity.email,
      name: userEntity.name,
      role: graphqlRole,
      createdAt: userEntity.createdAt || undefined,
      updatedAt: userEntity.updatedAt || undefined,
    };
  }
}

