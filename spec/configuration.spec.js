/* eslint max-len: ["off"] */
const {
    defaults,
    extend,
    addDefaultSettings,
    setupHtmlInjection,
    DEFAULT_SETTINGS,
    JS_SETTINGS,
    CSS_SETTINGS
} = require('../lib/configuration');

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

describe('extend', () => {
    it('should keep base object unchanged when no overrides are provided', () => {
        const base = { test: 1 };
        const target = { test: 1 };

        const result = extend(base);

        expect(base).toEqual(target);
        expect(result).toBe(base);
    });

    it('should let override existing params and add missing ones', () => {
        const base = { test: 1, other: 3 };
        const target = { test: 2, value: 1, other: 3 };
        const override = { test: 2, value: 1 };

        const result = extend(base, override);

        expect(base).toEqual(target);
        expect(result).toBe(base);
    });

    it('should let override existing params and add missing ones from multiple objects', () => {
        const base = { test: 1, other: 3 };
        const target = { test: 5, value: 7, other: 3, nothing: 'a' };
        const overrides = [
            { test: 2, value: 1 },
            { test: 5 },
            { value: 7 },
            null,
            undefined,
            { nothing: 'a' }
        ];

        const result = extend(base, ...overrides);

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

describe('setupHtmlInjection', () => {
    it('should return JS and CSS settings if no HTML settings provided', () => {
        const settings = {};
        const target = [JS_SETTINGS, CSS_SETTINGS];

        const result = setupHtmlInjection(settings);

        expect(result).toEqual(target);
    });

    it('should throw if settings is not an object', () => {
        expect(() => setupHtmlInjection('test')).toThrow();
    });

    it('should update start token for JS', () => {
        const settings = {
            js: 'start'
        };

        const result = setupHtmlInjection(settings);

        expect(result[0].start).toBe('start');
        expect(result[1].start).not.toBe('start');
    });

    it('should update start token for CSS', () => {
        const settings = {
            css: 'start'
        };

        const result = setupHtmlInjection(settings);

        expect(result[0].start).not.toBe('start');
        expect(result[1].start).toBe('start');
    });

    it('should update end token', () => {
        const settings = {
            end: 'end'
        };

        const result = setupHtmlInjection(settings);

        expect(result[0].end).toBe('end');
        expect(result[1].end).toBe('end');
    });

    it('should update join delimiter', () => {
        const settings = {
            joinDelimiter: 'test'
        };

        const result = setupHtmlInjection(settings);

        expect(result[0].joinDelimiter).toBe('test');
        expect(result[1].joinDelimiter).toBe('test');
    });
});
