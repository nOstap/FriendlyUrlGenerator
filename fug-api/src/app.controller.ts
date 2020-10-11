import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UrlPair } from './entities/url-pair.entity';
import { UrlGeneratorService } from './services/url-generator/url-generator.service';
import { UrlPairService } from './services/url-pair/url-pair.service';

@Controller()
export class AppController {

  constructor(
    private urlGenerator: UrlGeneratorService,
    private urlPairService: UrlPairService,
  ) { }

  @Post('url-generator/friendly')
  async createFriendlyUrl(@Body('sourceUrl') sourceUrl: string): Promise<string> {
    const exists = await this.urlPairService.findBySourceUrl(sourceUrl);
    if (exists) {
      return exists.friendlySlug;
    }

    const url = this.urlGenerator.makeFriendlyUrl(sourceUrl);
    await this.urlPairService.create(sourceUrl, url);

    return url;
  }

  @Get(':slug')
  async getSourceUrl(@Param('slug') slug: string): Promise<string> {
    const urlPair = await this.urlPairService.findBySlug(slug);

    return urlPair.sourceUrl;
  }
}
