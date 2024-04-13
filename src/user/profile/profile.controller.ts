import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profile.service';

@Controller('profile')
@ApiTags('Profile')
export class ProfileController {
    constructor ( private readonly  profileService: ProfileService) {}

    @Get()
    GetAll() : string {
        return 'Profile'
    }
}
