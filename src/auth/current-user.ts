import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import type { RequestIdentity } from './jwt-lite';

export type CurrentUserIdentity = RequestIdentity;

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    return (req as unknown as { user?: RequestIdentity }).user ?? null;
  },
);
