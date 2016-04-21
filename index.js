/**
 * @module simple-injector
 * @borrows module:simple-injector/injector.inject as stringInjector
 */

const { inject } = require('./lib/injector.js');
const { setupHtmlInjection } = require('./lib/configuration');

/**
 * It will search for known files in scriptsAndStyles array and inject them in
 * proper places in baseHtml
 * @memberof module:simple-injector
 * @param {string} baseHtml - HTML content to be modified
 * @param {Array.<string>} scriptsAndStyles - flat list of JS and CSS files
 * @param {HtmlInjectionSettings} [settings] - settings for injecting
 * @returns {string}
 */
function htmlInjector(baseHtml, scriptsAndStyles, settings) {
    if (!baseHtml || !baseHtml.length) {
        throw new Error('No HTML content provided.');
    }

    if (!scriptsAndStyles || !scriptsAndStyles.length) {
        return baseHtml;
    }

    return setupHtmlInjection(settings)
        .reduce((html, config) => inject(html, scriptsAndStyles, config), baseHtml);
}

module.exports = {
    htmlInjector,
    stringInjector: inject
};
