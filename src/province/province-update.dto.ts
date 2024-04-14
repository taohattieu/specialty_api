import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class ProvinceUpdateDto {
    @IsOptional()
    @IsString()
    @ApiProperty({ example: ''})
    name: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: ''})
    image: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: ''})
    description: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: ''})
    regions_id: string;
}
