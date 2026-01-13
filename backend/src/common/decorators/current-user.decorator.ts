import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface CurrentUserPayload {
  sub: string;
  email: string;
  name: string;
  role: string;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): CurrentUserPayload => {
    // Handle both GraphQL and HTTP contexts
    const gqlContext = GqlExecutionContext.create(ctx);
    const request = gqlContext.getContext().req || ctx.switchToHttp().getRequest();
    return request.user;
  },
);

