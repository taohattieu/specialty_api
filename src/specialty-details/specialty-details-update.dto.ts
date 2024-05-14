import { Optional } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"


export class SpecialtyDetailsUpdateDto {

    specialtydetails_id

    @ApiProperty({ example: ''})
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: ''})
    ingredient: string;

    @ApiProperty({ example: ''})
    @IsNotEmpty()
    origin: string;

    @ApiProperty({ example: ''})
    @IsNotEmpty()
    image: string;

    @ApiProperty({ example: ''})
    @Optional()
    description: string;

    @ApiProperty({ example: ''})
    @Optional()
    specialty_id: string;

}