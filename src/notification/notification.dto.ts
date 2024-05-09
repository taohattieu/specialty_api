import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"
import { BasedDto } from "src/common/based.dto"
import { AccountEntity } from "src/user/account/entities/account.entities"


export class NotificationDto extends BasedDto {

    notification_id: string

    @IsNotEmpty()
    @ApiProperty({ example: 'Sự kiện tại địa phương'})
    type: string

    @IsNotEmpty()
    @ApiProperty({ example: 'Giỗ tổ Hùng Vương'})
    message: string

    send_at: Date

    @ApiProperty({ example: ''})
    account_id: string;
}