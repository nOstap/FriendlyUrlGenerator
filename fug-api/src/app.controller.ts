import { Body, Controller, Get, Logger, NotFoundException, Param, Post, Redirect, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { url } from 'inspector';
import { UrlGeneratorService } from './services/url-generator/url-generator.service';
import { UrlPairService } from './services/url-pair/url-pair.service';

@Controller()
export class AppController {

  constructor(
    private urlGenerator: UrlGeneratorService,
    private urlPairService: UrlPairService,
  ) { }

  @Post('api/url-generator/friendly')
  async createFriendlyUrl(@Body('sourceUrl') sourceUrl: string): Promise<string> {
    const exists = await this.urlPairService.findBySourceUrl(sourceUrl);

    if (exists) {
      return exists.friendlyPath;
    }

    let friendlyPath = this.urlGenerator.createFriendlyPath(sourceUrl);
    await this.urlPairService.create(sourceUrl, friendlyPath);

    return friendlyPath;
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
