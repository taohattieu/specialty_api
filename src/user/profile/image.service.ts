import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import * as path from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageEntity } from './entities/image.entities';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
  ) {}

  async uploadImage(image: any): Promise<string> {
    if (!image || !image.filename) {
      throw new Error('No file uploaded or invalid file');
    }
    const imagePath: string = await this.saveImageToDatabase(image);
    return imagePath;
  }

  private async saveImageToDatabase(image: any): Promise<string> {
    const imagePath: string = '/uploads/' + image.filename;
    const newImage = this.imageRepository.create({ imagePath });
    await this.imageRepository.save(newImage);
    return imagePath;
  }
}
