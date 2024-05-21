import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateFavoritesDto {
  @ApiProperty({ example: 'fc83743d-2bc9-49ef-9efa-2fa66c6171f5'})
  account_id: string;

  @ApiProperty({ example: '13467dfe-126d-4d9f-aaf1-d674aae64212'})
  specialty_id: string;
}
