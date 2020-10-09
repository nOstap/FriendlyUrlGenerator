import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlPair } from '../../entities/url-pair.entity';
import { Repository } from 'typeorm';

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
