import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';
import { UrlPair } from './entities/url-pair.entity';
import { UrlPairService } from './services/url-pair/url-pair.service';

@Controller()
export class AppController {

  constructor(
    private urlPairService: UrlPairService,
  ) { }

  @Post('url-generator/friendly')
  async createFriendlyUrl(@Body('sourceUrl') sourceUrl: string): Promise<string> {
    let urlPair = await this.urlPairService.findBySourceUrl(sourceUrl);

    if (!urlPair) {
      urlPair = await this.urlPairService.create(sourceUrl);
    }

    return `${process.env.WEB_API_URL}/${urlPair.friendlyPath}`;
  }

  @Get(':friendlyPath')
  @Redirect()
  async redirectToSource(@Param('friendlyPath') friendlyPath: string): Promise<{ url: string }> {
    const urlPair = await this.urlPairService.findByPath(friendlyPath);

    if (!urlPair) {
      return { url: `${process.env.WEB_APP_URL}/${friendlyPath}` };
    }

    return { url: urlPair.sourceUrl };
  }
}
