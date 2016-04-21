/**
 * @typedef {object} InjectionSettings
 * @property {string} start - string token informing where to start injecting results
 * @property {string} [end] - string token informing where injected results ends
 * @property {string} [joinDelimiter] - how the array of results should be joined into a final
 * output
 * @property {replaceCallback} [replaceFn] - callback preparing output for injection
 * @property {supportCheckCallback} [isSupported] - callback verifying if file
 * should be processed
 */

/**
 * @typedef {object} HtmlInjectionSettings
 * @property {string} [js] - string token informing where to start injecting script tags
 * @property {string} [css] - string token informing where to start injecting link tags
 * @property {string} [end] - string token informing where injected results ends
 * @property {string} [joinDelimiter] - how the array of results should be joined into a final
 * output
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
