import { ConflictException } from '@nestjs/common';
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
  });

  describe('createFriendlyUrl()', () => {
    it('returns existing friendly url', async () => {
      const existingPair = new UrlPair();
      existingPair.friendlyPath = 'friendlyUrl';
      jest.spyOn(urlPairService, 'findBySourceUrl').mockResolvedValue(existingPair);

      const response = await appController.createFriendlyUrl('existingSource');

      expect(response).toEqual(existingPair.friendlyPath);
    });

    it('create new url pair', async () => {
      const newUrlPair = new UrlPair();
      newUrlPair.sourceUrl = 'foo';
      newUrlPair.friendlyPath = 'bar';
      jest.spyOn(urlPairService, 'findBySourceUrl').mockResolvedValue(null);
      const createSpy = jest.spyOn(urlPairService, 'create').mockResolvedValue(newUrlPair);

      const response = await appController.createFriendlyUrl('foo');

      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(createSpy).toHaveBeenCalledWith(newUrlPair.sourceUrl);
      expect(response).toEqual(newUrlPair.friendlyPath);
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
