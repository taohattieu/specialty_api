import { ApiProperty } from "@nestjs/swagger";

export class JwtTokenDto {
    @ApiProperty({ example: ''})
    token: string;
  }
  