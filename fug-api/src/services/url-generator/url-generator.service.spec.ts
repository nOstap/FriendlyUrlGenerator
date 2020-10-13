import { Test, TestingModule } from '@nestjs/testing';
import { ADJECTIVES_DICTIONARY, NOUNS_DICTIONARY } from '../../constants';
import { UrlGeneratorService } from './url-generator.service';

describe('UrlGeneratorService', () => {
  let service: UrlGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlGeneratorService,
        {
          provide: ADJECTIVES_DICTIONARY,
          useValue: ['adjective'],
        },
        {
          provide: NOUNS_DICTIONARY,
          useValue: ['noun'],
        },
      ],
    }).compile();

    service = module.get<UrlGeneratorService>(UrlGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('generates friendly url', async () => {
    const response = await service.createFriendlyPath('foo');

    expect(response).toBe('adjective-adjective-adjective-noun');
  });
});
