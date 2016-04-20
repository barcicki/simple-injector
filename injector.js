const escapeStringRegexp = require('escape-string-regexp');

const JS_FILE = /\.js$/;
const JS_REPLACEMENT_START = '<!-- injector:js -->';
const REPLACEMENT_END = '<!-- endinjector -->';
const JOIN_DELIMITER = '';

function baseInjector(html, scriptsAndStyles) {
    if (!html) {
        throw new Error('No HTML content provided');
    }

    if (!scriptsAndStyles || !scriptsAndStyles.length) {
        return html;
    }

    const scriptStart = escapeStringRegexp(JS_REPLACEMENT_START);
    const replacementEnd = escapeStringRegexp(REPLACEMENT_END);
    const scriptReplacement = new RegExp(`${scriptStart}([\\s\\S]*)${replacementEnd}`, 'g');

    const scriptsTags = scriptsAndStyles
        .filter(fileName => JS_FILE.test(fileName))
        .map(fileName => `<script src="${fileName}"></script>`);

    const scripts = `${JS_REPLACEMENT_START}${scriptsTags.join(JOIN_DELIMITER)}${REPLACEMENT_END}`;

    return html.replace(scriptReplacement, scripts);
}

module.exports = {
    baseInjector
};
