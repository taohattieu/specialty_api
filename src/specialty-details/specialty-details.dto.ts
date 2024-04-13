import { Optional } from "@nestjs/common"
import { IsNotEmpty } from "class-validator"


export class SpecialtyDetailsDto {

    specialtydetails_id

    @IsNotEmpty()
    name: string

    ingredient: string

    @IsNotEmpty()
    origin: string

    @IsNotEmpty()
    image: string

    @Optional()
    description: string
}