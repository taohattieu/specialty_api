import { Optional } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"


export class SpecialtyDetailsUpdateDto {

    specialtydetails_id

    @ApiProperty({ example: ''})
    @Optional()
    name: string;

    @ApiProperty({ example: ''})
    @Optional()
    ingredient: string;

    @ApiProperty({ example: ''})
    @Optional()
    origin: string;

    @ApiProperty({ example: ''})
    @Optional()
    image: string;

    @ApiProperty({ example: ''})
    @Optional()
    description: string;

    @ApiProperty({ example: ''})
    @Optional()
    specialty_id: string;

}