import { Provider } from '@nestjs/common';
import * as lineReader from 'line-reader';
import * as path from 'path';
import { ADJECTIVES_DICTIONARY, NOUNS_DICTIONARY } from 'src/constants';

export interface DictionaryProviderOptions {
    filePath: string,
    name: string,
}

export const dictionaryProviders: Provider<Promise<string[]>>[] = [
    {
        provide: ADJECTIVES_DICTIONARY,
        useFactory: () => {
            return loadDictionary(process.env.ADJECTIVES_PATH);
        }
    },
    {
        provide: NOUNS_DICTIONARY,
        useFactory: () => {
            return loadDictionary(process.env.NOUNS_PATH);
        }
    }
];

/**
 * Creates word dictionary from given file path.
 * @param dictionary 
 * @param string 
 */
function loadDictionary(filePath: string): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
        const dictionary = [];
        lineReader.eachLine(path.resolve(filePath), (line, last) => {
            dictionary.push(line);
            if (last) {
                resolve(dictionary);
            }
        });
    });
}