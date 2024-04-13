import { IsNotEmpty, IsString } from "class-validator"

export class RegionsDto {
    regions_id: string

    @IsNotEmpty()
    @IsString()
    name: string
}