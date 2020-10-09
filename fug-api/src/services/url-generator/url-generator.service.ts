import { Injectable, OnModuleInit } from '@nestjs/common';
import * as lineReader from 'line-reader';
import * as os from 'os';
import * as seedrandom from 'seedrandom';
import * as path from 'path';

@Injectable()
export class UrlGeneratorService implements OnModuleInit {
  private _adjectives: string[] = [];
  private _nouns: string[] = [];

  constructor() { }

  async onModuleInit() {
    lineReader.eachLine(path.resolve(__dirname + '../../../data/english-adjectives.txt'), line => this._adjectives.push(line));
    lineReader.eachLine(path.resolve(__dirname + '../../../data/english-nouns.txt'), line => this._nouns.push(line));
  }

  /**
   * Generates pseudo-random words basing on a source url.
   * @param sourceUrl 
   * @param deep - how many adjectives to generate (increases friendly url complexity) (3 adjectives as default)
   */
    makeFriendlyUrl(sourceUrl: string, deep: number = 3): Promise<string> {
    const rng = seedrandom(sourceUrl);
    const randomAdjectives = Array(deep).fill('').map(() => this._adjectives[Math.floor(rng() * this._adjectives.length)]);
    const randomNoun = this._nouns[Math.floor(rng() * this._nouns.length)];
    const slug = `${randomAdjectives.join('-')}-${randomNoun}`;
    console.log(sourceUrl);
    return Promise.resolve(`${os.hostname()}/${slug}`);
  }
}