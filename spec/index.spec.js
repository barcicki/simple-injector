/* eslint max-len: ["off"] */
const { htmlInjector } = require('../index');

const SAMPLE_HTML_PAGE = '<html><head><title>Test</title><!-- injector:css --><!-- endinjector --></head><body><!-- injector:js --><!-- endinjector --></body></html>';

describe('HTML Injector', () => {
    it('should throw when no html content are provided', () => {
        expect(() => htmlInjector()).toThrow();
        expect(() => htmlInjector(null)).toThrow();
        expect(() => htmlInjector('')).toThrow();
    });

    it('should return unmodified html if list of files is empty', () => {
        expect(htmlInjector('test')).toBe('test');
        expect(htmlInjector('test2', [])).toBe('test2');
    });

    it('should htmlInjector js files', () => {
        const initialHtml = SAMPLE_HTML_PAGE;
        const scripts = ['file1.js', 'file2.js'];
        const targetHtml = '<html><head><title>Test</title><!-- injector:css --><!-- endinjector --></head><body><!-- injector:js --><script src="file1.js"></script><script src="file2.js"></script><!-- endinjector --></body></html>';

        const finalHtml = htmlInjector(initialHtml, scripts);

        expect(finalHtml).toBe(targetHtml);
    });

    it('should htmlInjector js in place of previously htmlInjector js files', () => {
        const initialHtml = SAMPLE_HTML_PAGE;
        const firstScriptSet = ['file1.js'];
        const secondScriptSet = ['file2.js'];
        const targetHtml = '<html><head><title>Test</title><!-- injector:css --><!-- endinjector --></head><body><!-- injector:js --><script src="file2.js"></script><!-- endinjector --></body></html>';

        const middleHtml = htmlInjector(initialHtml, firstScriptSet);
        const finalHtml = htmlInjector(middleHtml, secondScriptSet);

        expect(finalHtml).toBe(targetHtml);
    });

    it('should htmlInjector css files', () => {
        const initialHtml = SAMPLE_HTML_PAGE;
        const styles = ['file1.css', 'file2.css'];
        const targetHtml = '<html><head><title>Test</title><!-- injector:css --><link rel="stylesheet" href="file1.css" type="text/css"><link rel="stylesheet" href="file2.css" type="text/css"><!-- endinjector --></head><body><!-- injector:js --><!-- endinjector --></body></html>';

        const finalHtml = htmlInjector(initialHtml, styles);

        expect(finalHtml).toBe(targetHtml);
    });

    it('should htmlInjector css in place of previously htmlInjector css files', () => {
        const initialHtml = SAMPLE_HTML_PAGE;
        const firstStylesSet = ['file1.css'];
        const secondStylesSet = ['file2.css'];
        const targetHtml = '<html><head><title>Test</title><!-- injector:css --><link rel="stylesheet" href="file2.css" type="text/css"><!-- endinjector --></head><body><!-- injector:js --><!-- endinjector --></body></html>';

        const middleHtml = htmlInjector(initialHtml, firstStylesSet);
        const finalHtml = htmlInjector(middleHtml, secondStylesSet);

        expect(finalHtml).toBe(targetHtml);
    });
});
