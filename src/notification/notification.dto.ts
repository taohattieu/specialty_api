import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional, IsUUID } from "class-validator";

export class NotificationDto {
    @IsNotEmpty()
    @ApiProperty({ example: 'Sự kiện tại địa phương' })
    type: string;

    @IsNotEmpty()
    @ApiProperty({ example: 'Giỗ tổ Hùng Vương' })
    message: string;

    @IsOptional()
    @IsUUID()
    @ApiProperty({ example: 'fc83743d-2bc9-49ef-9efa-2fa66c6171f5' })
    account_id?: string; 
}
