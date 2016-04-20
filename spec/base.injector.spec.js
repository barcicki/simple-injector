/* eslint max-len: ["off"] */
const { baseInjector } = require('../injector');

const SAMPLE_HTML_PAGE = '<html><head><title>Test</title><!--injector:css --><!-- endinjector --></head><body><!-- injector:js --><!-- endinjector --></body></html>';

describe('Base injector', () => {
    it('should throw when no html content are provided', () => {
        expect(() => baseInjector()).toThrow();
        expect(() => baseInjector(null)).toThrow();
    });

    it('should return unmodified html if list of files is empty', () => {
        expect(baseInjector('test')).toBe('test');
        expect(baseInjector('test2', [])).toBe('test2');
    });

    it('should inject js files', () => {
        const initialHtml = SAMPLE_HTML_PAGE;
        const scripts = ['file.js'];
        const targetHtml = '<html><head><title>Test</title><!--injector:css --><!-- endinjector --></head><body><!-- injector:js --><script src="file.js"></script><!-- endinjector --></body></html>';

        const finalHtml = baseInjector(initialHtml, scripts);

        expect(finalHtml).toBe(targetHtml);
    });

    it('should inject js in place of previously inject js files', () => {
        const initialHtml = SAMPLE_HTML_PAGE;
        const firstScriptSet = ['file1.js'];
        const secondScriptSet = ['file2.js'];
        const targetHtml = '<html><head><title>Test</title><!--injector:css --><!-- endinjector --></head><body><!-- injector:js --><script src="file2.js"></script><!-- endinjector --></body></html>';

        const middleHtml = baseInjector(initialHtml, firstScriptSet);
        const finalHtml = baseInjector(middleHtml, secondScriptSet);

        expect(finalHtml).toBe(targetHtml);
    });
});
