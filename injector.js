const REPLACEMENT_END = '<!-- endinjector -->';
const JOIN_DELIMITER = '';

/**
 * JS scripts profile
 * @type {Profile}
 */
const JS_FILES = {
    start: '<!-- injector:js -->',
    end: REPLACEMENT_END,
    isSupported: (fileName) => /\.js$/.test(fileName),
    replaceFn: (fileName) => `<script src="${fileName}"></script>`
};

/**
 * CSS styles profile
 * @type {Profile}
 */
const CSS_FILES = {
    start: '<!-- injector:css -->',
    end: REPLACEMENT_END,
    isSupported: (fileName) => /\.css$/.test(fileName),
    replaceFn: (fileName) => `<link rel="stylesheet" href="${fileName}" type="text/css">`
};

/**
 * Contains list of supported profiles
 * @type {Array.<Profile>}
 */
const PROFILES = [JS_FILES, CSS_FILES];

/**
 * Performs injection on the provided HTML string based on the profile configuration
 * @param {Profile} profile
 * @param {string} html
 * @param {Array.<string>} files
 * @returns {string}
 */
function replace(profile, html, files) {
    const startPos = html.indexOf(profile.start);
    const endPos = html.indexOf(profile.end, startPos);

    if (startPos === -1) {
        return html;
    }

    const supportedFiles = files.filter(profile.isSupported);

    if (!supportedFiles.length) {
        return html;
    }

    const replacedHtml = supportedFiles
        .map(profile.replaceFn)
        .join(JOIN_DELIMITER);

    const precedingHtml = html.slice(0, startPos + profile.start.length);
    let succeedingHtml;

    if (endPos > startPos) {
        succeedingHtml = html.slice(endPos);
    } else {
        succeedingHtml = profile.end + html.slice(startPos + profile.start.length);
    }

    return precedingHtml + replacedHtml + succeedingHtml;
}

/**
 * It will search for known files in scriptsAndStyles array and inject them in
 * proper places in baseHtml
 * @param {string} baseHtml
 * @param {Array.<string>} scriptsAndStyles
 * @returns {string}
 */
function baseInjector(baseHtml, scriptsAndStyles) {
    if (!baseHtml) {
        throw new Error('No HTML content provided');
    }

    if (!scriptsAndStyles || !scriptsAndStyles.length) {
        return baseHtml;
    }

    return PROFILES
        .reduce((html, profile) => replace(profile, html, scriptsAndStyles), baseHtml);
}

module.exports = {
    baseInjector
};

/**
 * @typedef {object} Profile
 * @property {string} start - string informing where to start injecting results
 * @property {string} end - string informing where injected results ends
 * @property {replaceCallback} replaceFn - callback preparing output for injection
 * @property {supportCheckCallback} isSupported - callback verifying if file
 * should be processed
 */

/**
 * This callback should return true if given file name is bo included in further
 * processing
 * @callback supportCheckCallback
 * @param {string} fileName
 * @returns {boolean} - whether file is supported
 */

/**
 * This callback should return injection result for given file, e.g. script tag
 * @callback replaceCallback
 * @param {string} fileName
 * @returns {string} - injection result
 */
