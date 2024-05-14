import { Module } from '@nestjs/common';
import { ImagesController } from './image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesService } from './image.service';
import { ImageEntity } from './entities/image.entities';

@Module({
    imports: [
        TypeOrmModule.forFeature([ImageEntity]),
      ],
      controllers: [ImagesController],
      providers: [ImagesService],
})
export class ImagesModule {}
