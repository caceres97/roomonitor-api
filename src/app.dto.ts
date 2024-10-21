import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ required: true, default: 'angel' })
  username: string;

  @ApiProperty({ required: true, default: '1324' })
  password: string;
}
