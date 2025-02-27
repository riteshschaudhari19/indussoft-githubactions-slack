const restoreEscapedNewLine = (text) => {
    text.replace(/\\r\\n/g, "\n").replace(/\\n/g, "\n");
}
const restoreEscapeTab = (text) => text.replace(/\\t/g, "\t");

module.exports = {
    restoreEscapeTab,
    restoreEscapedNewLine
};