import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Extracts the authenticated user (JWT payload) from the request object.
 * Must be used with @UseGuards(AuthGuard('jwt')).
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
