import { Injectable } from '@nestjs/common';

@Injectable()
export class UrlGeneratorService {
  makeFriendlyUrl(sourceUrl: string): Promise<string> {
    throw new Error('not implmented');
  }
}
