import { Test, TestingModule } from '@nestjs/testing';
import { UrlPairService } from './url-pair.service';

describe('UrlPairService', () => {
  let service: UrlPairService;

  beforeEach(async () => {
    service = new UrlPairService(jest.fn() as any);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
