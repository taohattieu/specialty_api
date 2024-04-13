import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Province } from './province.entities';
import { ProvinceDto } from './province.dto';

@Injectable()
export class ProvinceService {
  constructor(
    @InjectRepository(Province)
    private readonly provinceRepository: Repository<Province>,
  ) {}

  async getAllProvinces(): Promise<Province[]> {
    return this.provinceRepository.find();
  }

  async createProvince(provinceDto: ProvinceDto): Promise<Province> {
    const createdProvince = this.provinceRepository.create(provinceDto);
    return await this.provinceRepository.save(createdProvince);
  }
}
