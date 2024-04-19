import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class SignupDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({ example: ""})
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @ApiProperty({ example: ""})
  password: string;
}

export class LoginDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({ example: ""})
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @ApiProperty({ example: ""})
  password: string;
}