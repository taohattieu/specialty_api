import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"


export class RegionsDto {
    regions_id: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: ""})
    name: string
}