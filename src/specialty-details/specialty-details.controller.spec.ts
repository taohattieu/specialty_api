import { Test, TestingModule } from '@nestjs/testing';
import { SpecialtyDetailsController } from './specialty-details.controller';


describe('SpecialtyController', () => {
  let controller: SpecialtyDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecialtyDetailsController],
    }).compile();

    controller = module.get<SpecialtyDetailsController>(SpecialtyDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
