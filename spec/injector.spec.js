/* eslint max-len: ["off"] */
const { inject } = require('../lib/injector');

describe('String Injector', () => {
    it('should throw if not content provided', () => {
        expect(() => inject()).toThrow();
        expect(() => inject(null)).toThrow();
        expect(() => inject('')).toThrow();
    });

    it('should throw if no start token provided', () => {
        expect(() => inject('test')).toThrow();
        expect(() => inject('test', null, { start: null })).toThrow();
        expect(() => inject('test', null, { start: '' })).toThrow();
    });

    it('should return same content if starting token not found', () => {
        const baseContent = 'test';
        const targetContent = 'test';
        const items = ['item'];
        const settings = {
            start: 'x'
        };

        expect(inject(baseContent, items, settings)).toBe(targetContent);
    });

    it('should return same content if items list is empty', () => {
        const baseContent = 'test';
        const targetContent = 'test';
        const emptySet = [];
        const noSet = null;
        const settings = {
            start: 'test'
        };

        expect(inject(baseContent, emptySet, settings)).toBe(targetContent);
        expect(inject(baseContent, noSet, settings)).toBe(targetContent);
    });

    it('should run add content and suffix if not present in base content', () => {
        const baseContent = 'start';
        const targetContent = 'startitem1item2end';
        const items = ['item1', 'item2'];
        const settings = {
            start: 'start',
            end: 'end'
        };

        expect(inject(baseContent, items, settings)).toBe(targetContent);
    });

    it('should run add content just after start and add suffix if not present in base content', () => {
        const baseContent = 'startuntouched';
        const targetContent = 'startitem1item2enduntouched';
        const items = ['item1', 'item2'];
        const settings = {
            start: 'start',
            end: 'end'
        };

        expect(inject(baseContent, items, settings)).toBe(targetContent);
    });

    it('should run replace content between start and end', () => {
        const baseContent = 'starttoremoveend';
        const targetContent = 'startitem1item2end';
        const items = ['item1', 'item2'];
        const settings = {
            start: 'start',
            end: 'end'
        };

        expect(inject(baseContent, items, settings)).toBe(targetContent);
    });

    it('should replace once even if more start and ends are present in the test', () => {
        const baseContent = 'startendstartend';
        const targetContent = 'startitem1item2endstartend';
        const items = ['item1', 'item2'];
        const settings = {
            start: 'start',
            end: 'end'
        };

        expect(inject(baseContent, items, settings)).toBe(targetContent);
    });

    it('should not modify text before and after the start-end range', () => {
        const baseContent = 'beforestartcontentendafter';
        const targetContent = 'beforestartitem1item2endafter';
        const items = ['item1', 'item2'];
        const settings = {
            start: 'start',
            end: 'end'
        };

        expect(inject(baseContent, items, settings)).toBe(targetContent);
    });

    it('should run isSupported on each item and return same content if items are not supported', () => {
        const baseContent = 'test';
        const targetContent = 'test';
        const items = ['item1', 'item2'];
        const settings = {
            start: 'test',
            isSupported: jasmine.createSpy('test').and.returnValue(false)
        };

        expect(inject(baseContent, items, settings)).toBe(targetContent);
        expect(settings.isSupported).toHaveBeenCalledTimes(2);
    });

    it('should run replaceFn on each item and return new content', () => {
        const baseContent = 'test';
        const targetContent = 'testvalue1value2';
        const items = ['item1', 'item2'];
        const settings = {
            start: 'test',
            end: '',
            replaceFn: jasmine.createSpy('test').and.returnValues('value1', 'value2')
        };

        expect(inject(baseContent, items, settings)).toBe(targetContent);
        expect(settings.replaceFn).toHaveBeenCalledTimes(2);
    });
});
