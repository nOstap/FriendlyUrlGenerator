import { Injectable } from '@nestjs/common';
import { UrlPair } from 'src/entities/url-pair.entity';
import { UrlWithParsedQuery } from 'url';

@Injectable()
export class UrlPairService {

    findBySourceUrl(sourceUrl: string): Promise<UrlPair> {
        throw new Error("not implmented");
    }

    create(sourceUrl: string, url: string): Promise<UrlPair> {
        throw new Error('Method not implemented.');
    }
}
