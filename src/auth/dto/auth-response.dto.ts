import { ApiProperty } from '@nestjs/swagger';

export class AuthUserDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  name!: string;
}

export class AuthResponseDto {
  @ApiProperty()
  ok!: boolean;

  @ApiProperty()
  token!: string;

  @ApiProperty({ type: AuthUserDto })
  user!: AuthUserDto;
}
