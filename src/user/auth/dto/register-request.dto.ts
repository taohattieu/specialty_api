import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterRequestDto {

  @ApiProperty({ example: "taohattieu" })
  @IsString()
  @IsNotEmpty()
  username: string;


  @ApiProperty({ example: "123456" })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: "" })
  @IsString()
  avatar: string;

  @ApiProperty({ example: "Tao" })
  @IsString()
  firstName: string;

  @ApiProperty({ example: "Nguyen" })
  @IsString()
  lastName: string;

}
