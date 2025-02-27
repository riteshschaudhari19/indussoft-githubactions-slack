const buildMessage = require("./build-message")
const context = require("./context")
const { apiPostMessage } = require("./slack-api")
const jsonPretty = (data) => JSON.stringify(data, undefined, 2)

const postMessage = async () => {
    try {
        const token = context.getRequired("slack-bot-user-oauth-access-token")
        const channels = context.getRequired("slack-channel")
        const text = context.getRequired("slack-text")

        const results= [];
        for (const channel of channels.split(",")) {
            channel = channel.trim();

            const payload = buildMessage(channel, text)
            const result = await apiPostMessage(token, payload)
            results.push(result);
        }
        const resultAsJson = jsonPretty(results[0]);
        context.setOutput("slack-result", resultAsJson)
        const resultsAsJson = jsonPretty(results);
        context.setOutput("slack-results", resultsAsJson)
    } catch (error) {
        context.setFailed
    }
}
module.exports = postMessage