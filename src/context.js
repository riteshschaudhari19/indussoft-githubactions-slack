const core = require("@actions/core")

const getRequired = (name) => core.getInput(name, {required: true})
const getOptional = (name) => core.getInput(name, {required: false})
const getEnv = () => process.env
const setFailed = (msg) => core.setFailed(msg)
const setOutput = (name, value) => core.setOutput(name, value)

module.exports = {
    getRequired,
    getOptional,
    getEnv,
    setFailed,
    setOutput,
};