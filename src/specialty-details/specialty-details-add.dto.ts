import { Optional } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
import { SpecialtyDetails } from "./specialty-details.entities";


export class SpecialtyDetailsAddDto {

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

    constructor(specialtyDetails: SpecialtyDetails){
        // super(specialtyDetails);
        this.name = specialtyDetails.name;
        this.ingredient = specialtyDetails.ingredient;
        this.origin = specialtyDetails.origin;
        this.image = specialtyDetails.image;
        this.description = specialtyDetails.description;
        this.specialty_id = specialtyDetails.specialty_id;

    }
}