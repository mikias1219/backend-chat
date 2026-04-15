import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../database/prisma.service';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  private normalizeEmail(email: string) {
    return email.trim().toLowerCase();
  }

  async register(params: { email: string; password: string; name?: string }) {
    const email = this.normalizeEmail(params.email);
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new BadRequestException('Email already registered');

    const passwordHash = await bcrypt.hash(params.password, 12);
    const name = params.name?.trim() || email.split('@')[0] || 'User';

    const user = await this.prisma.user.create({
      data: { email, name, passwordHash },
    });

    const token = await this.jwt.sign({
      userId: user.id,
      email,
      name: user.name,
    });
    return { token, user };
  }

  async login(params: { email: string; password: string }) {
    const email = this.normalizeEmail(params.email);
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash)
      throw new UnauthorizedException('Invalid credentials');

    const ok = await bcrypt.compare(params.password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    const token = await this.jwt.sign({
      userId: user.id,
      email,
      name: user.name,
    });
    return { token, user };
  }

  async requireRegisteredUser(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.email)
      throw new UnauthorizedException('User is not registered');
    return user;
  }
}
