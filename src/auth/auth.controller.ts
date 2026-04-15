import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a user for chat (email/password)' })
  @ApiOkResponse({ type: AuthResponseDto })
  async register(@Body() body: RegisterDto): Promise<AuthResponseDto> {
    const { token, user } = await this.auth.register({
      email: body.email,
      password: body.password,
      name: body.name,
    });
    return {
      ok: true,
      token,
      user: { id: user.id, email: user.email!, name: user.name },
    };
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login (email/password) and get a JWT' })
  @ApiOkResponse({ type: AuthResponseDto })
  async login(@Body() body: LoginDto): Promise<AuthResponseDto> {
    const { token, user } = await this.auth.login({
      email: body.email,
      password: body.password,
    });
    return {
      ok: true,
      token,
      user: { id: user.id, email: user.email!, name: user.name },
    };
  }
}
