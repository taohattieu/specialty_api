import { Optional } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class ProvinceAddDto {

    province_id: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: ""})
    name: string

    @IsOptional()
    @ApiProperty({ example: ""})
    image: string

    @IsOptional()
    @ApiProperty({ example: ""})
    description: string

    @IsNotEmpty()
    @ApiProperty({ example: ""})
    regions_id: string
}