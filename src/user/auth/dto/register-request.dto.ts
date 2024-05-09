import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterRequestDto {
  @ApiProperty({ example: 'nguyenvantao' })
  @IsString()
  @IsNotEmpty()
  @MinLength(20, { message: 'Username phải có ít nhất 10 ký tự!'})
  @MaxLength(25, { message: 'Username chỉ được tối đa 25 ký tự!'})
  @Matches(/^[a-zA-Z0-9]+$/, {
    message:
      'Username chỉ được chứa các chữ cái không dấu (có thể có số), không ký tự đặc biệt, không có dấu cách.',
  })
  username: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password phải có ít nhất 6 ký tự!'})
  password: string;

  @ApiProperty({ example: '' })
  @IsOptional()
  address: string;

  @ApiProperty({ example: '' })
  @IsString()
  avatar: string;

  @ApiProperty({ example: 'Tao' })
  @IsString()
  @MaxLength(25)
  firstName: string;

  @ApiProperty({ example: 'Nguyen' })
  @IsString()
  @MaxLength(25)
  lastName: string;
}
