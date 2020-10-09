import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlPair } from 'src/entities/url-pair.entity';
import { Repository } from 'typeorm';
import { Url, UrlWithParsedQuery } from 'url';

@Injectable()
export class UrlPairService {

    constructor(@InjectRepository(UrlPair) private readonly urlPairRepository: Repository<UrlPair>) {}

    findBySourceUrl(sourceUrl: string): Promise<UrlPair> {
        return this.urlPairRepository.findOne({ sourceUrl });
    }

    create(sourceUrl: string, url: string): Promise<UrlPair> {
        const urlPair = new UrlPair();
        urlPair.friendlyUrl = url;
        urlPair.sourceUrl = sourceUrl;
        
        return this.urlPairRepository.save(urlPair);
    }
}
