import { Optional } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class ProvinceDto {

    province_id: string

    @IsString()
    @IsNotEmpty()
    name: string

    image: string

    description: string
}