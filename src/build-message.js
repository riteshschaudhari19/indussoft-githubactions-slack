const { restoreEscapedNewLine, restoreEscapeTab } = require("../utils/escaper");

const buildMessage = (channel = "", text = "") => {
    const message = {
        channel,
        text,
    }
    message.text  = restoreEscapedNewLine(message.text);
    message.text  = restoreEscapeTab(message.text);
    return message;
}
module.exports = buildMessage;