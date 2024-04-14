import { Optional } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"


export class SpecialtyUpdateDto {

    specialty_id

    @IsNotEmpty()
    @ApiProperty({ example: ""})
    name: string

    @IsNotEmpty()
    @ApiProperty({ example: ""})
    image: string

    @IsNotEmpty()
    @ApiProperty({ example: ""})
    province_id: string


}