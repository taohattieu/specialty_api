import { Optional } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class ProvinceDto {

    province_id: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: ""})
    name: string

    @ApiProperty({ example: ""})
    image: string

    @ApiProperty({ example: ""})
    description: string

    @IsNotEmpty()
    @ApiProperty({ example: ""})
    regions_id: string
}