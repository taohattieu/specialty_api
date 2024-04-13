import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SpecialtyService } from './specialty.service';

@Controller('specialty')
@ApiTags('Specialty')
export class SpecialtyController {
    constructor(private readonly specialtyService: SpecialtyService) {}

    @Get()
    GetAll(): string{
        return 'Specialty'
    }
}
