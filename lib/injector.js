/**
 * @module simple-injector/injector
 */

const { addDefaultSettings } = require('./configuration');

/**
 * Performs injection on the provided string using provided settings
 * @memberof module:simple-injector/injector
 * @param {string} content - content to modify
 * @param {Array.<string>} items - list of items to inject
 * @param {InjectionSettings} settings - injection settings
 * @returns {string}
 */
function inject(content, items, settings) {
    if (!content || !content.length) {
        throw new Error('Content cannot be empty.');
    }

    addDefaultSettings(settings);

    if (!settings.start || !settings.start.length) {
        throw new Error('Starting token cannot be empty.');
    }

    const startPos = content.indexOf(settings.start);
    const endPos = content.indexOf(settings.end, startPos);

    if (startPos === -1 || !items || !items.length) {
        return content;
    }

    const filteredItems = items.filter(settings.isSupported);

    if (!filteredItems.length) {
        return content;
    }

    const updatedContent = filteredItems
        .map(settings.replaceFn)
        .join(settings.joinDelimiter);

    const precedingContent = content.slice(0, startPos + settings.start.length);
    let succeedingContent;

    if (endPos > startPos) {
        succeedingContent = content.slice(endPos);
    } else {
        succeedingContent = settings.end + content.slice(startPos + settings.start.length);
    }

    return precedingContent + updatedContent + succeedingContent;
}

module.exports = {
    inject
};
