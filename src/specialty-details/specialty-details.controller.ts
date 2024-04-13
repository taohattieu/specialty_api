import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SpecialtyDetailsService } from './specialty-details.service';

@Controller('specialtyDetails')
@ApiTags('Specialty_Details')
export class SpecialtyDetailsController {
    constructor (private readonly specialtydetailsService: SpecialtyDetailsService) {}

    @Get()
    GetAll() : string {
        return 'Specialty Details'
    }
}
