import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { UrlPair } from './entities/url-pair.entity';
import { UrlGeneratorService } from './services/url-generator/url-generator.service';
import { UrlPairService } from './services/url-pair/url-pair.service';
jest.mock('./services/url-pair/url-pair.service');
jest.mock('./services/url-generator/url-generator.service');

describe('AppController', () => {
  let appController: AppController;
  let urlPairService: UrlPairService;
  let urlGenerator: UrlGeneratorService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        UrlPairService,
        UrlGeneratorService,
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    urlPairService = app.get<UrlPairService>(UrlPairService);
    urlGenerator = app.get<UrlGeneratorService>(UrlGeneratorService);
  });

  describe('createFriendlyUrl()', () => {
    it('returns existing friendly url', async () => {
      const existingPair = new UrlPair();
      existingPair.friendlyPath = 'friendlyUrl';
      jest.spyOn(urlPairService, 'findBySourceUrl').mockResolvedValue(existingPair);

      const response = await appController.createFriendlyUrl('existingSource');

      expect(response).toEqual(existingPair.friendlyPath);
    });

    it('returns new generatred url', async () => {
      const newFriendlyUrl = 'new.friendly.url';
      jest.spyOn(urlPairService, 'create').mockResolvedValue(null);
      jest.spyOn(urlPairService, 'findBySourceUrl').mockResolvedValue(null);
      jest.spyOn(urlGenerator, 'createFriendlyPath').mockReturnValue(newFriendlyUrl);

      const response = await appController.createFriendlyUrl('foo');

      expect(response).toEqual(newFriendlyUrl);
    });

    it('presists newly generate url pair', async () => {
      const newUrlPair = new UrlPair();
      newUrlPair.friendlyPath = 'new.friendly.url';
      newUrlPair.sourceUrl = 'new.friendly.url';
      newUrlPair.id = 'fooId';
      jest.spyOn(urlPairService, 'findBySourceUrl').mockResolvedValue(null);
      const createSpy = jest.spyOn(urlPairService, 'create').mockResolvedValue(newUrlPair);
      jest.spyOn(urlGenerator, 'createFriendlyPath').mockReturnValue(newUrlPair.sourceUrl);

      await appController.createFriendlyUrl(newUrlPair.sourceUrl);

      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(createSpy).toHaveBeenCalledWith(newUrlPair.sourceUrl, newUrlPair.friendlyPath);
    });

  });

  describe('getSourceUrl()', () => {
    it('redirects to source url', async () => {
      const urlPair = new UrlPair({ sourceUrl: 'bar' });
      jest.spyOn(urlPairService, 'findByPath').mockResolvedValue(urlPair);

      const response = await appController.redirectToSource('foo');

      expect(response).toEqual({ url: urlPair.sourceUrl });
    });

    it('redirects to web app when pair not found', async () => {
      jest.spyOn(urlPairService, 'findByPath').mockResolvedValue(null);
      process.env.WEB_APP_URL = 'bar';

      const response = await appController.redirectToSource('foo');

      expect(response).toEqual({ url: 'bar/foo' });
    });

  });
  



});
