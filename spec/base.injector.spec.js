/* eslint max-len: ["off"] */
const { baseInjector } = require('../injector');

const SAMPLE_HTML_PAGE = '<html><head><title>Test</title><!-- injector:css --><!-- endinjector --></head><body><!-- injector:js --><!-- endinjector --></body></html>';

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
        const scripts = ['file1.js', 'file2.js'];
        const targetHtml = '<html><head><title>Test</title><!-- injector:css --><!-- endinjector --></head><body><!-- injector:js --><script src="file1.js"></script><script src="file2.js"></script><!-- endinjector --></body></html>';

        const finalHtml = baseInjector(initialHtml, scripts);

        expect(finalHtml).toBe(targetHtml);
    });

    it('should inject js in place of previously inject js files', () => {
        const initialHtml = SAMPLE_HTML_PAGE;
        const firstScriptSet = ['file1.js'];
        const secondScriptSet = ['file2.js'];
        const targetHtml = '<html><head><title>Test</title><!-- injector:css --><!-- endinjector --></head><body><!-- injector:js --><script src="file2.js"></script><!-- endinjector --></body></html>';

        const middleHtml = baseInjector(initialHtml, firstScriptSet);
        const finalHtml = baseInjector(middleHtml, secondScriptSet);

        expect(finalHtml).toBe(targetHtml);
    });

    it('should inject css files', () => {
        const initialHtml = SAMPLE_HTML_PAGE;
        const styles = ['file1.css', 'file2.css'];
        const targetHtml = '<html><head><title>Test</title><!-- injector:css --><link rel="stylesheet" href="file1.css" type="text/css"><link rel="stylesheet" href="file2.css" type="text/css"><!-- endinjector --></head><body><!-- injector:js --><!-- endinjector --></body></html>';

        const finalHtml = baseInjector(initialHtml, styles);

        expect(finalHtml).toBe(targetHtml);
    });

    it('should inject css in place of previously inject css files', () => {
        const initialHtml = SAMPLE_HTML_PAGE;
        const firstStylesSet = ['file1.css'];
        const secondStylesSet = ['file2.css'];
        const targetHtml = '<html><head><title>Test</title><!-- injector:css --><link rel="stylesheet" href="file2.css" type="text/css"><!-- endinjector --></head><body><!-- injector:js --><!-- endinjector --></body></html>';

        const middleHtml = baseInjector(initialHtml, firstStylesSet);
        const finalHtml = baseInjector(middleHtml, secondStylesSet);

        expect(finalHtml).toBe(targetHtml);
    });
});
