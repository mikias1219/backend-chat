import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { identityFromBearer } from './jwt-lite';

@Injectable()
export class BearerAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<{ headers?: Record<string, unknown> }>();
    const auth = (req?.headers?.authorization as string | undefined) ?? undefined;
    const ident = identityFromBearer(auth);
    if (!ident) throw new UnauthorizedException('Missing or invalid Authorization header');
    return true;
  }
}

