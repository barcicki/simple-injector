const JS_FILE = /\.js$/;
const CSS_FILE = /\.css$/;
const REPLACEMENT_START_JS = '<!-- injector:js -->';
const REPLACEMENT_START_CSS = '<!-- injector:css -->';
const REPLACEMENT_END = '<!-- endinjector -->';
const JOIN_DELIMITER = '';

function replaceStyles(html, files) {
    const startPos = html.indexOf(REPLACEMENT_START_CSS);
    const endPos = html.indexOf(REPLACEMENT_END, startPos);

    if (startPos === -1) {
        return html;
    }

    const cssFiles = files.filter(fileName => CSS_FILE.test(fileName));

    if (!cssFiles.length) {
        return html;
    }

    const injectedTags = cssFiles
        .map(fileName => `<link rel="stylesheet" href="${fileName}" type="text/css">`)
        .join(JOIN_DELIMITER);

    const precedingHtml = html.slice(0, startPos + REPLACEMENT_START_CSS.length);
    let succeedingHtml;

    if (endPos > startPos) {
        succeedingHtml = html.slice(endPos);
    } else {
        succeedingHtml = REPLACEMENT_END + html.slice(startPos + REPLACEMENT_START_CSS.length);
    }

    return precedingHtml + injectedTags + succeedingHtml;
}

function replaceScripts(html, files) {
    const startPos = html.indexOf(REPLACEMENT_START_JS);
    const endPos = html.indexOf(REPLACEMENT_END, startPos);

    if (startPos === -1) {
        return html;
    }

    const jsFiles = files.filter(fileName => JS_FILE.test(fileName));

    if (!jsFiles.length) {
        return html;
    }

    const injectedTags = jsFiles
        .map(fileName => `<script src="${fileName}"></script>`)
        .join(JOIN_DELIMITER);

    const precedingHtml = html.slice(0, startPos + REPLACEMENT_START_JS.length);
    let succeedingHtml;

    if (endPos > startPos) {
        succeedingHtml = html.slice(endPos);
    } else {
        succeedingHtml = REPLACEMENT_END + html.slice(startPos + REPLACEMENT_START_JS.length);
    }

    return precedingHtml + injectedTags + succeedingHtml;
}

function baseInjector(html, scriptsAndStyles) {
    if (!html) {
        throw new Error('No HTML content provided');
    }

    if (!scriptsAndStyles || !scriptsAndStyles.length) {
        return html;
    }

    return replaceStyles(replaceScripts(html, scriptsAndStyles), scriptsAndStyles);
}

module.exports = {
    baseInjector
};
