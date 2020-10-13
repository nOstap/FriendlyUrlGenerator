import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlPair } from '../../entities/url-pair.entity';
import { Repository } from 'typeorm';
import { UrlGeneratorService } from '../url-generator/url-generator.service';

@Injectable()
export class UrlPairService {

  constructor(
    @InjectRepository(UrlPair) private readonly urlPairRepository: Repository<UrlPair>,
    private readonly urlGenerator: UrlGeneratorService,
  ) { }

  findBySourceUrl(sourceUrl: string): Promise<UrlPair> {
    return this.urlPairRepository.findOne({ sourceUrl });
  }

  async create(sourceUrl: string): Promise<UrlPair> {
    const friendlyPath = this.urlGenerator.createFriendlyPath(sourceUrl);

    try {
      return await this.urlPairRepository.save(new UrlPair({
        sourceUrl,
        friendlyPath
      }));
    } catch (e) {
      this.urlGenerator.increaseComplexity();
      return await this.create(sourceUrl);
    } finally {
      this.urlGenerator.resetComplexity();
    }
  }

  findByPath(friendlyPath: string): PromiseLike<UrlPair> {
    return this.urlPairRepository.findOne({ friendlyPath });
  }
}
