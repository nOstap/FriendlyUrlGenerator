import { UrlPair } from "./url-pair.entity";

describe('UrlPair', () => {
    describe('constructor()', () => {

        test.each([
            [{ sourceUrl: 'http://foo.bar', friendlyPath: 'foo-bar' }, { sourceUrl: 'http://foo.bar', friendlyPath: 'foo-bar' }],
            [{ sourceUrl: 'foo.bar', friendlyPath: 'foo-bar' }, { sourceUrl: 'http://foo.bar', friendlyPath: 'foo-bar' }],
            [{ sourceUrl: 'foo.bar', friendlyPath: null }, { sourceUrl: 'http://foo.bar', friendlyPath: undefined }],
            [{ sourceUrl: null, friendlyPath: null }, { sourceUrl: undefined, friendlyPath: undefined }],
            [{ sourceUrl: undefined, friendlyPath: undefined }, { sourceUrl: undefined, friendlyPath: undefined }],
            [null, { sourceUrl: undefined, friendlyPath: undefined }],
        ])
            ('instantiate url pair with config: %o', (config, expected) => {
                const result = new UrlPair(config);

                expect(result).toEqual(expected);
            });

    });
});