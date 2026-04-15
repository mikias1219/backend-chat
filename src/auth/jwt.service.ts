import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private secret(): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is required');
    }
    return secret;
  }

  async sign(params: {
    userId: string;
    email: string;
    name: string;
  }): Promise<string> {
    return jwt.sign(
      {
        userId: params.userId,
        email: params.email,
        name: params.name,
      },
      this.secret(),
      {
        algorithm: 'HS256',
        subject: params.userId,
        expiresIn: '7d',
      },
    );
  }
}
