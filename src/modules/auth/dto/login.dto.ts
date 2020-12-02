import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({required: true, default: 'test'})
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({required: true, default: '123'})
  @IsNotEmpty()
  @IsString()
  password: string;
}
