/**
 * @module simple-injector
 * @borrows module:simple-injector/injector.inject as stringInjector
 */

const { inject } = require('./lib/injector.js');
const { INJECTION_PROFILES } = require('./lib/configuration');

/**
 * It will search for known files in scriptsAndStyles array and inject them in
 * proper places in baseHtml
 * @memberof module:simple-injector
 * @param {string} baseHtml - HTML content to be modified
 * @param {Array.<string>} scriptsAndStyles - flat list of JS and CSS files
 * @returns {string}
 */
function htmlInjector(baseHtml, scriptsAndStyles) {
    if (!baseHtml || !baseHtml.length) {
        throw new Error('No HTML content provided.');
    }

    if (!scriptsAndStyles || !scriptsAndStyles.length) {
        return baseHtml;
    }

    return INJECTION_PROFILES
        .reduce((html, settings) => inject(html, scriptsAndStyles, settings), baseHtml);
}

module.exports = {
    htmlInjector,
    stringInjector: inject
};
