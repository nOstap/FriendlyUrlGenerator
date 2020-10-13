import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlPair } from '../../entities/url-pair.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UrlPairService {

    constructor(@InjectRepository(UrlPair) private readonly urlPairRepository: Repository<UrlPair>) { }

    findBySourceUrl(sourceUrl: string): Promise<UrlPair> {
        return this.urlPairRepository.findOne({ sourceUrl });
    }

    create(sourceUrl: string, friendlyPath: string): Promise<UrlPair> {
        const newUrlPair = new UrlPair({
            sourceUrl,
            friendlyPath
        });
        return this.urlPairRepository.save(newUrlPair);
    }

    findByPath(friendlyPath: string): PromiseLike<UrlPair> {
        return this.urlPairRepository.findOne({ friendlyPath });
    }
}
