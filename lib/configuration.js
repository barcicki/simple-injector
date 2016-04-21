/**
 * @module simple-injector/configuration
 */

const REPLACEMENT_END = '<!-- endinjector -->';
const REPLACEMENT_START_JS = '<!-- injector:js -->';
const REPLACEMENT_START_CSS = '<!-- injector:css -->';

/**
 * Default settings
 * @type {InjectionSettings}
 */
const DEFAULT_SETTINGS = {
    start: '',
    end: '',
    replaceFn: (item) => item,
    isSupported: () => true,
    joinDelimiter: ''
};

/**
 * Default injection settings for JavaScript files
 * @type {InjectionSettings}
 */
const JS_SETTINGS = {
    start: REPLACEMENT_START_JS,
    end: REPLACEMENT_END,
    isSupported: (fileName) => /\.js$/.test(fileName),
    replaceFn: (fileName) => `<script src="${fileName}"></script>`
};

/**
 * Default injection settings for CSS files
 * @type {InjectionSettings}
 */
const CSS_SETTINGS = {
    start: REPLACEMENT_START_CSS,
    end: REPLACEMENT_END,
    isSupported: (fileName) => /\.css$/.test(fileName),
    replaceFn: (fileName) => `<link rel="stylesheet" href="${fileName}" type="text/css">`
};

/**
 * Contains list of supported profiles
 * @type {Array<InjectionSettings>}
 */
const INJECTION_PROFILES = [JS_SETTINGS, CSS_SETTINGS];

/**
 * Assigns missing properties to target object
 * @memberof module:simple-injector/configuration
 * @param {object} target - target object that may miss properties
 * @param {object} base - object with default values
 * @returns {object} target
 */
function defaults(target, base) {
    for (const prop in base) {
        if (base.hasOwnProperty(prop) && typeof target[prop] === 'undefined') {
            target[prop] = base[prop];
        }
    }

    return target;
}

/**
 * Adds missing settings to the object
 * @memberof module:simple-injector/configuration
 * @param {object} target
 * @returns {InjectionSettings} target
 */
function addDefaultSettings(target) {
    return defaults(target, DEFAULT_SETTINGS);
}

module.exports = {
    INJECTION_PROFILES,
    JS_SETTINGS,
    CSS_SETTINGS,
    DEFAULT_SETTINGS,
    defaults,
    addDefaultSettings
};
