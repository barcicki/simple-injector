function baseInjector(html, scriptsAndStyles) {
    if (!html) {
        throw new Error('No HTML content provided');
    }

    if (!scriptsAndStyles || scriptsAndStyles.length) {
        return html;
    }

    return html;
}

module.exports = {
    baseInjector
};
