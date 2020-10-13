import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';
import { UrlPairService } from './services/url-pair/url-pair.service';

@Controller()
export class AppController {

  constructor(
    private urlPairService: UrlPairService,
  ) { }

  @Post('url-generator/friendly')
  async createFriendlyUrl(@Body('sourceUrl') sourceUrl: string): Promise<string> {
    const exists = await this.urlPairService.findBySourceUrl(sourceUrl);

    if (exists) {
      return exists.friendlyPath;
    }

    const urlPair = await this.urlPairService.create(sourceUrl);

    return urlPair.friendlyPath;
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
