import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './image.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('images')
@ApiTags('Image')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() image: any): Promise<string> {
    return this.imagesService.uploadImage(image);
  }
}
