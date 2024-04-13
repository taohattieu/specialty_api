import { Test, TestingModule } from '@nestjs/testing';
import { SpecialtyDetailsService } from './specialty-details.service';

describe('SpecialtyService', () => {
  let service: SpecialtyDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecialtyDetailsService],
    }).compile();

    service = module.get<SpecialtyDetailsService>(SpecialtyDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
