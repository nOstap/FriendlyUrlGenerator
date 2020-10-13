import { UrlPair } from '../../entities/url-pair.entity';
import { Repository } from 'typeorm/repository/Repository';
import { UrlPairService } from './url-pair.service';
import { UrlGeneratorService } from '../url-generator/url-generator.service';
import { MaxComplexityException } from 'src/exceptions/max-complexity.exception';
jest.mock('typeorm/repository/Repository');
jest.mock('../url-generator/url-generator.service');

describe('UrlPairService', () => {
  let service: UrlPairService;
  let urlGenerator: UrlGeneratorService;
  let repository: Repository<UrlPair>;
  let adjectives: string[];
  let nouns: string[];

  beforeEach(async () => {
    jest.clearAllMocks();
    adjectives = ['adj'];
    nouns = ['noun'];
    repository = new Repository();
    urlGenerator = new UrlGeneratorService(adjectives, nouns);
    service = new UrlPairService(repository, urlGenerator);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Find by Source Url', () => {
    it('returns existing Url Pair', async () => {
      const expected = new UrlPair();
      jest.spyOn(repository, 'findOne').mockResolvedValue(expected);

      const result = await service.findBySourceUrl('foo');

      expect(result).toEqual(expected);
    });
    
  });

  describe('Create Url Pair', () => {
    it('create new url pair', async () => {
      const expected: UrlPair = {
        id: 'test',
        sourceUrl: 'foo',
        friendlyPath: 'bar',
      };
      jest.spyOn(repository, 'save').mockResolvedValue(expected);

      const result = await service.create('foo');

      expect(result).toEqual(expected);
    });

    it('creates more complex url when previous already exists', async () => {
      const saveSpy = jest.spyOn(repository, 'save').mockRejectedValueOnce(new Error());
      const createFriendlyPathSpy = jest.spyOn(urlGenerator, 'createFriendlyPath');
      const increaseComplexitySpy = jest.spyOn(urlGenerator, 'increaseComplexity');
      
      await service.create('foo');

      expect(saveSpy).toHaveBeenCalledTimes(2);
      expect(createFriendlyPathSpy).toHaveBeenCalledTimes(2);
      expect(increaseComplexitySpy).toHaveBeenCalledTimes(1);
    });

    
  });

  describe('Find by Friendly Path', () => {
    it('returns existing Url Pair', async () => {
      const expected = new UrlPair();
      jest.spyOn(repository, 'findOne').mockResolvedValue(expected);

      const result = await service.findByPath('foo');

      expect(result).toEqual(expected);
    });
    
  });
  

});
