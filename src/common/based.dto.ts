import { ApiProperty } from '@nestjs/swagger';
import { BasedEntity } from './based.entity';

export class BasedDto {

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(entity: BasedEntity) {
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }
}
