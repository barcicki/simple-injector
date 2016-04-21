/* eslint max-len: ["off"] */
const { htmlInjector } = require('../index');

const SAMPLE_HTML_PAGE = '<html><head><title>Test</title><!-- injector:css --><!-- endinjector --></head><body><!-- injector:js --><!-- endinjector --></body></html>';
const SAMPLE_HTML_PAGE_WITHOUT_TOKENS = '<html><head><title>Test</title></head><body></body></html>';
const SAMPLE_HTML_PAGE_WITH_DIFFERENT_TOKEN = '<html><head><title>Test</title><!-- css --><!-- end --></head><body><!-- js --><!-- end --></body></html>';

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

    it('should not inject anything if tokens are not present', () => {
        const initialHtml = SAMPLE_HTML_PAGE_WITHOUT_TOKENS;
        const scripts = ['file1.js', 'file2.js'];
        const targetHtml = SAMPLE_HTML_PAGE_WITHOUT_TOKENS;

        const finalHtml = htmlInjector(initialHtml, scripts);

        expect(finalHtml).toBe(targetHtml);
    });

    it('should not inject anything if tokens are not present after token override', () => {
        const initialHtml = SAMPLE_HTML_PAGE;
        const scripts = ['file1.js', 'file2.js'];
        const targetHtml = SAMPLE_HTML_PAGE;
        const settings = {
            js: '<!-- js -->',
            css: '<!-- css -->'
        };

        const finalHtml = htmlInjector(initialHtml, scripts, settings);

        expect(finalHtml).toBe(targetHtml);
    });

    it('should inject js files', () => {
        const initialHtml = SAMPLE_HTML_PAGE;
        const scripts = ['file1.js', 'file2.js'];
        const targetHtml = '<html><head><title>Test</title><!-- injector:css --><!-- endinjector --></head><body><!-- injector:js --><script src="file1.js"></script><script src="file2.js"></script><!-- endinjector --></body></html>';

        const finalHtml = htmlInjector(initialHtml, scripts);

        expect(finalHtml).toBe(targetHtml);
    });

    it('should inject js in place of previously injected js files', () => {
        const initialHtml = SAMPLE_HTML_PAGE;
        const firstScriptSet = ['file1.js'];
        const secondScriptSet = ['file2.js'];
        const targetHtml = '<html><head><title>Test</title><!-- injector:css --><!-- endinjector --></head><body><!-- injector:js --><script src="file2.js"></script><!-- endinjector --></body></html>';

        const middleHtml = htmlInjector(initialHtml, firstScriptSet);
        const finalHtml = htmlInjector(middleHtml, secondScriptSet);

        expect(finalHtml).toBe(targetHtml);
    });

    it('should inject css files', () => {
        const initialHtml = SAMPLE_HTML_PAGE;
        const styles = ['file1.css', 'file2.css'];
        const targetHtml = '<html><head><title>Test</title><!-- injector:css --><link rel="stylesheet" href="file1.css" type="text/css"><link rel="stylesheet" href="file2.css" type="text/css"><!-- endinjector --></head><body><!-- injector:js --><!-- endinjector --></body></html>';

        const finalHtml = htmlInjector(initialHtml, styles);

        expect(finalHtml).toBe(targetHtml);
    });

    it('should inject css in place of previously injected css files', () => {
        const initialHtml = SAMPLE_HTML_PAGE;
        const firstStylesSet = ['file1.css'];
        const secondStylesSet = ['file2.css'];
        const targetHtml = '<html><head><title>Test</title><!-- injector:css --><link rel="stylesheet" href="file2.css" type="text/css"><!-- endinjector --></head><body><!-- injector:js --><!-- endinjector --></body></html>';

        const middleHtml = htmlInjector(initialHtml, firstStylesSet);
        const finalHtml = htmlInjector(middleHtml, secondStylesSet);

        expect(finalHtml).toBe(targetHtml);
    });

    it('should inject with different js token', () => {
        const initialHtml = SAMPLE_HTML_PAGE_WITH_DIFFERENT_TOKEN;
        const files = ['script.js', 'style.css'];
        const targetHtml = '<html><head><title>Test</title><!-- css --><link rel="stylesheet" href="style.css" type="text/css"><!-- end --></head><body><!-- js --><script src="script.js"></script><!-- end --></body></html>';
        const settings = {
            js: '<!-- js -->',
            css: '<!-- css -->',
            end: '<!-- end -->'
        };

        const finalHtml = htmlInjector(initialHtml, files, settings);

        expect(finalHtml).toBe(targetHtml);
    });
});
