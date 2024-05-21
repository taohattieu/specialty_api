import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpecialtyAddDto } from './specialty-add.dto';
import { SpecialtyUpdateDto } from './specialty-update.dto';
import { SpecialtyEntity } from './specialty.entities';

@Injectable()
export class SpecialtyService {
  constructor(
    @InjectRepository(SpecialtyEntity)
    private readonly specialtyRepository: Repository<SpecialtyEntity>,
  ) {}

  //Hiển thị tất cả đặc sản
  async getAllSpecialty(): Promise<SpecialtyEntity[]> {
    return this.specialtyRepository.find();
  }


  //Tạo thêm đặc sản mới
  async createSpecialty(specialtyAddDto: SpecialtyAddDto): Promise<SpecialtyEntity> {
    const createdSpecialty = this.specialtyRepository.create(specialtyAddDto);
    return await this.specialtyRepository.save(createdSpecialty);
  }

  // Cập nhật thông tin của đặc sản dựa trên id
  async updateSpecialtyById(id: string, specialtyUpdateDto: SpecialtyUpdateDto): Promise<SpecialtyEntity> {
    const specialty = await this.getSpecialtyById(id);
    Object.assign(specialty, specialtyUpdateDto);
    return await this.specialtyRepository.save(specialty);
  }

  // Lấy thông tin của một đặc sản dựa trên id
  async getSpecialtyById(id: string): Promise<SpecialtyEntity> {
    const specialty = await this.specialtyRepository.findOne({ where: { specialty_id: id } });
    if (!specialty) {
      throw new NotFoundException(`Specialty with id ${id} not found`);
    }
    return specialty;
  }


  //Xóa đặc sản theo id
  async deleteSpecialty(id: string): Promise<void> {
    const result = await this.specialtyRepository.delete({ specialty_id: id });
    if (result.affected === 0) {
      throw new NotFoundException(`Specialty with id ${id} not found`);
    }
  }
}
