import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { identityFromBearer } from './jwt-lite';

@Injectable()
export class BearerAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context
      .switchToHttp()
      .getRequest<{ headers?: Record<string, unknown>; user?: unknown }>();
    const auth =
      (req?.headers?.authorization as string | undefined) ?? undefined;
    const ident = await identityFromBearer(auth);
    if (!ident)
      throw new UnauthorizedException(
        'Missing or invalid Authorization header',
      );
    req.user = ident;
    return true;
  }
}
