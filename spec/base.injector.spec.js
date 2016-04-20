const { baseInjector } = require('../injector');

describe('Base injector', () => {
    it('should throw when no html content are provided', () => {
        expect(() => baseInjector()).toThrow();
        expect(() => baseInjector(null)).toThrow();
    });

    it('should return unmodified html if list of files is empty', () => {
        expect(baseInjector('test')).toBe('test');
        expect(baseInjector('test2', [])).toBe('test2');
    });
});
