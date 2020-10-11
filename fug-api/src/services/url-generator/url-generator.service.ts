import { Inject, Injectable } from '@nestjs/common';
import * as seedrandom from 'seedrandom';
import { ADJECTIVES_DICTIONARY, NOUNS_DICTIONARY } from '../../constants';

@Injectable()
export class UrlGeneratorService {
  constructor(
    @Inject(ADJECTIVES_DICTIONARY) private readonly _adjectives: string[],
    @Inject(NOUNS_DICTIONARY) private readonly _nouns: string[],
  ) { }

  /**
   * Generates pseudo-random words basing on a source url.
   * @param sourceUrl 
   * @param deep - how many adjectives to generate (increases friendly url complexity) (3 adjectives as default)
   */
    makeFriendlyUrl(sourceUrl: string, deep: number = 3): string {
    const rng = seedrandom(sourceUrl);
    const randomAdjectives = Array(deep).fill('').map(() => this._adjectives[Math.floor(rng() * this._adjectives.length)]);
    const randomNoun = this._nouns[Math.floor(rng() * this._nouns.length)];
    const slug = `${randomAdjectives.join('-')}-${randomNoun}`;

    return slug;
  }
}