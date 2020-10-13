import { UrlPair } from '../../entities/url-pair.entity';
import { Repository } from 'typeorm/repository/Repository';
import { UrlPairService } from './url-pair.service';
jest.mock('typeorm/repository/Repository');

describe('UrlPairService', () => {
  let service: UrlPairService;
  let repository: Repository<UrlPair>;

  beforeEach(async () => {
    jest.clearAllMocks();
    repository = new Repository();
    service = new UrlPairService(repository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
