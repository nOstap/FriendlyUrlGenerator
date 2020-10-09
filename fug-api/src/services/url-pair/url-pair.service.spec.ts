import { Test, TestingModule } from '@nestjs/testing';
import { UrlPairService } from './url-pair.service';

describe('UrlPairService', () => {
  let service: UrlPairService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrlPairService],
    }).compile();

    service = module.get<UrlPairService>(UrlPairService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
