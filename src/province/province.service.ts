import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Province } from './province.entities';
import { ProvinceAddDto } from './province-add.dto';
import { ProvinceUpdateDto } from './province-update.dto';

@Injectable()
export class ProvinceService {
  constructor(
    @InjectRepository(Province)
    private readonly provinceRepository: Repository<Province>,
  ) {}

  //Hiển thị tất cả tỉnh
  async getAllProvinces(): Promise<Province[]> {
    return this.provinceRepository.find();
  }


  //Tạo thêm tỉnh mới
  async createProvince(provinceAddDto: ProvinceAddDto): Promise<Province> {
    const createdProvince = this.provinceRepository.create(provinceAddDto);
    return await this.provinceRepository.save(createdProvince);
  }

  // Cập nhật thông tin của tỉnh dựa trên id
  async updateProvinceById(id: string, provinceUpdateDto: ProvinceUpdateDto): Promise<Province> {
    const province = await this.getProvinceById(id);
    Object.assign(province, provinceUpdateDto);
    return await this.provinceRepository.save(province);
  }

  // Lấy thông tin của một tỉnh dựa trên id
  async getProvinceById(id: string): Promise<Province> {
    const province = await this.provinceRepository.findOne({ where: { province_id: id } });
    if (!province) {
      throw new NotFoundException(`Province with id ${id} not found`);
    }
    return province;
  }


  //Xóa tỉnh theo id
  async deleteProvince(id: string): Promise<void> {
    const result = await this.provinceRepository.delete({ province_id: id });
    if (result.affected === 0) {
      throw new NotFoundException(`Province with id ${id} not found`);
    }
  }
}
