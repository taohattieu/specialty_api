import { IsNotEmpty } from "class-validator"


export class NotificationDto {

    notification_id: string

    @IsNotEmpty()
    type: string

    @IsNotEmpty()
    message: string

    @IsNotEmpty()
    send_at: string
}