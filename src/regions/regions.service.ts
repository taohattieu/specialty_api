import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Regions } from './regions.entities';
import { RegionsDto } from './regions.dto';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Regions)
    private readonly regionsRepository: Repository<Regions>,
  ) {}

  async getAllRegions(): Promise<Regions[]> {
    return await this.regionsRepository.find();
  }

  async createRegions(regionsDto: RegionsDto): Promise<Regions> {
    const createdRegions = await this.regionsRepository.save(regionsDto);
    return createdRegions;
  }
}
