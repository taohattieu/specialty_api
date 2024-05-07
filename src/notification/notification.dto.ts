import { IsNotEmpty } from "class-validator"
import { BasedDto } from "src/common/based.dto"


export class NotificationDto extends BasedDto {

    notification_id: string

    @IsNotEmpty()
    type: string

    @IsNotEmpty()
    message: string

    @IsNotEmpty()
    send_at: string
}