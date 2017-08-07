import skelt from './index';

describe('Skelt', () => {
    it('should only walk on an object, a function result or an array', () => {
        expect(skelt('hello', {})).toEqual('hello');
        expect(skelt(() => ({ hello: 'world' }), {})).toEqual({ hello: 'world' });
        expect(skelt(['hello', () => 'world'], {})).toEqual(['hello', 'world']);
    });

    it('should not alterate plain object without function', () => {
        const plainObject = {
            name: 'John',
            address: {
                country: {
                    name: 'England',
                },
            },
        };

        expect(skelt(plainObject, {})).toEqual(plainObject);
    });

    it('should execute functions and set return value to the current key', () => {
        const objectWithFunction = {
            country: {
                code: ({ locale }) => locale,
            },
        };

        expect(skelt(objectWithFunction, { locale: 'en' })).toEqual({
            country: {
                code: 'en',
            },
        });
    });

    it('should walk and parse function results recursively', () => {
        const objectWithNestedFunction = {
            country: () => ({
                meta: ({ locale }) => ({
                    name: 'England',
                    locale,
                }),
            }),
        };

        expect(skelt(objectWithNestedFunction, { locale: 'en' })).toEqual({
            country: {
                meta: {
                    name: 'England',
                    locale: 'en',
                },
            },
        });
    });

    it('should keep array structure unchanged', () => {
        const objectWithArray = {
            countries: [
                { code: 'en' },
                { code: 'fr' },
            ],
        };

        expect(skelt(objectWithArray, {})).toEqual({
            countries: [
                { code: 'en' },
                { code: 'fr' },
            ],
        });
    });

    it('should handle `null` value correctly', () => {
        const filledSkeleton = skelt({ parent: null }, {});
        expect(filledSkeleton).toEqual({ parent: null });
    });
});
