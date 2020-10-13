import { Inject, Injectable } from '@nestjs/common';
import * as seedrandom from 'seedrandom';
import { MaxComplexityException } from '../../exceptions/max-complexity.exception';
import { ADJECTIVES_DICTIONARY, NOUNS_DICTIONARY } from '../../constants';

@Injectable()
export class UrlGeneratorService {
  /** how many adjectives to generate (increases friendly url complexity) (3 adjectives as default) */
  private _currentComplexity = 3;
  private readonly _maxComplexity = 20;

  constructor(
    @Inject(ADJECTIVES_DICTIONARY) private readonly _adjectives: string[],
    @Inject(NOUNS_DICTIONARY) private readonly _nouns: string[],
  ) { }

  /**
   * Generates pseudo-random words basing on a source url and complexity level.
   */
  createFriendlyPath(sourceUrl: string): string {
    const rng = seedrandom(sourceUrl);
    const randomAdjectives = Array(this._currentComplexity).fill('').map(() => this._adjectives[Math.floor(rng() * this._adjectives.length)]);
    const randomNoun = this._nouns[Math.floor(rng() * this._nouns.length)];
    const friendlyPath = `${randomAdjectives.join('-')}-${randomNoun}`;

    return friendlyPath;
  }

  resetComplexity(): void {
    this._currentComplexity = 3;
  }

  increaseComplexity(): void {
    if (this._currentComplexity >= this._maxComplexity) {
      throw new MaxComplexityException("Friendly path reached maximum number complexity.", 500);
    }

    this._currentComplexity++;
  }
}