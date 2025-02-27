const context = require("./context");
const postMessage = require("./postMessage");

const jsonPretty = (data) => JSON.stringify(data, undefined, 2)
const invoke = async () => {
    try {
        const func = context.getOptional("slack-function") || "send-message";
        switch (func) {
            case "send-message":
                await postMessage();
                break;
        
            default:
                break;
        }
    } catch (error) {
        context.setFailed("invoke failed:" + error + ":" + jsonPretty(error) )
    }
}

module.exports = invoke;