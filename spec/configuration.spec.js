/* eslint max-len: ["off"] */
const { defaults, addDefaultSettings, DEFAULT_SETTINGS } = require('../lib/configuration');

describe('defaults', () => {
    it('should keep base object unchanged when default params are not provided', () => {
        const base = { test: 1 };
        const target = { test: 1 };

        const result = defaults(base);

        expect(base).toEqual(target);
        expect(result).toBe(base);
    });

    it('should keep base object unchanged when it has all the properties', () => {
        const base = { test: 1 };
        const target = { test: 1 };
        const defaultValues = { test: 2 };

        const result = defaults(base, defaultValues);

        expect(base).toEqual(target);
        expect(result).toBe(base);
    });

    it('should add new property to base object if it is missing one', () => {
        const base = { test: 1 };
        const target = { test: 1, value: 2 };
        const defaultValues = { value: 2 };

        const result = defaults(base, defaultValues);

        expect(base).toEqual(target);
        expect(result).toBe(base);
    });

    it('should set new value for property if it is undefined', () => {
        const base = { test: undefined, value: null };
        const target = { test: 1, value: null };
        const defaultValues = { test: 1, value: 2 };

        const result = defaults(base, defaultValues);

        expect(base).toEqual(target);
        expect(result).toBe(base);
    });
});

describe('addDefaultSettings', () => {
    it('should decorate empty object with default settings', () => {
        const base = {};
        const target = DEFAULT_SETTINGS;

        const result = addDefaultSettings(base);

        expect(base).toEqual(target);
        expect(result).toBe(base);
    });
});
