import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpecialtyDetails } from './specialty-details.entities';
import { SpecialtyDetailsAddDto } from './specialty-details-add.dto';
import { SpecialtyDetailsUpdateDto } from './specialty-details-update.dto';
import { SpecialtyEntity } from 'src/specialty/specialty.entities';

@Injectable()
export class SpecialtyDetailsService {
  constructor(
    @InjectRepository(SpecialtyDetails)
    private readonly specialtyDetailsRepository: Repository<SpecialtyDetails>,
    @InjectRepository(SpecialtyEntity)
    private readonly specialtyRepository: Repository<SpecialtyEntity>, // Inject repository for Specialty
  ) {}

  // Hiển thị tất cả chi tiết đặc sản
  async getAllSpecialtyDetails(): Promise<SpecialtyDetails[]> {
    return this.specialtyDetailsRepository.find();
  }

  // Tạo thêm đặc sản chi tiết mới
  async createSpecialtyDetails(specialtyDetailsAddDto: SpecialtyDetailsAddDto): Promise<SpecialtyDetails> {
    const { specialty_id, ...rest } = specialtyDetailsAddDto;
    
    const specialty = await this.specialtyRepository.findOne({ where: { specialty_id: specialty_id } });
    if (!specialty) {
      throw new NotFoundException(`Specialty with id ${specialty_id} not found`);
    }

    const createdSpecialtyDetails = this.specialtyDetailsRepository.create({
      ...rest,
      Specialty: specialty,  // Gán đối tượng Specialty tìm được vào
    });

    return await this.specialtyDetailsRepository.save(createdSpecialtyDetails);
  }

  // Cập nhật thông tin của chi tiết đặc sản dựa trên id
  async updateSpecialtyDetailsById(id: string, specialtyDetailsUpdateDto: SpecialtyDetailsUpdateDto): Promise<SpecialtyDetails> {
    const { specialty_id, ...rest } = specialtyDetailsUpdateDto;
    const specialtyDetails = await this.getSpecialtyDetailsById(id);

    if (specialty_id) {
      const specialty = await this.specialtyRepository.findOne({ where: { specialty_id: specialty_id } });
      if (!specialty) {
        throw new NotFoundException(`Specialty with id ${specialty_id} not found`);
      }
      specialtyDetails.Specialty = specialty;
    }

    Object.assign(specialtyDetails, rest);
    return await this.specialtyDetailsRepository.save(specialtyDetails);
  }

  // Lấy thông tin của một đặc sản chi tiết dựa trên id
  async getSpecialtyDetailsById(id: string): Promise<SpecialtyDetails> {
    const specialtyDetails = await this.specialtyDetailsRepository.findOne({ where: { specialtydetails_id: id } });
    if (!specialtyDetails) {
      throw new NotFoundException(`SpecialtyDetails with id ${id} not found`);
    }
    return specialtyDetails;
  }

  // Xóa đặc sản chi tiết theo id
  async deleteSpecialtyDetails(id: string): Promise<void> {
    const result = await this.specialtyDetailsRepository.delete({ specialtydetails_id: id });
    if (result.affected === 0) {
      throw new NotFoundException(`SpecialtyDetails with id ${id} not found`);
    }
  }
}
