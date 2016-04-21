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
 * Overwrites properties in base object with properties from overrides
 * @memberof module:simple-injector/configuration
 * @param {object} base
 * @param {...object} overrides
 * @returns {object}
 */
function extend(base, ...overrides) {
    overrides.forEach((override) => {
        for (const prop in override) {
            if (override.hasOwnProperty(prop)) {
                base[prop] = override[prop];
            }
        }
    });

    return base;
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

/**
 * Returns array of JS and CSS configuration based on the provided HTML settings configuration
 * @memberof module:simple-injector/configuration
 * @param {HtmlInjectionSettings} settings
 * @returns {Array.<InjectionSettings>}
 */
function setupHtmlInjection(settings) {
    const jsSettings = extend({}, JS_SETTINGS);
    const cssSettings = extend({}, CSS_SETTINGS);

    if (!settings) {
        return [jsSettings, cssSettings];
    }

    if (typeof settings !== 'object') {
        throw new Error('Invalid settings argument type.');
    }

    if (settings.js) {
        jsSettings.start = settings.js;
    }

    if (settings.css) {
        cssSettings.start = settings.css;
    }

    if (settings.joinDelimiter) {
        jsSettings.joinDelimiter = cssSettings.joinDelimiter = settings.joinDelimiter;
    }

    if (settings.end) {
        jsSettings.end = cssSettings.end = settings.end;
    }

    return [jsSettings, cssSettings];
}

module.exports = {
    JS_SETTINGS,
    CSS_SETTINGS,
    DEFAULT_SETTINGS,
    defaults,
    extend,
    addDefaultSettings,
    setupHtmlInjection
};
