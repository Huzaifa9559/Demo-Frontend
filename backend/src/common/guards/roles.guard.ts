import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '../../users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    // Handle both GraphQL and HTTP contexts
    const gqlContext = GqlExecutionContext.create(context);
    const request = gqlContext.getContext().req || context.switchToHttp().getRequest();
    
    if (!request || !request.user) {
      return false;
    }

    const { user } = request;
    return requiredRoles.some((role) => user.role === role);
  }
}

