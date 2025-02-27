const https = require("https");
const HttpsProxyAgent = require("https-proxy-agent");

var proxyServer = process.env.http_proxy ||
                    process.env.HTTP_PROXY ||
                    process.env.https_proxy ||
                    process.env.HTTPS_PROXY ||
                    "None";

const getOptions = (token, path) => {
    return {
        hostname: "slack.com",
        post: 443,
        path: path,
        methode: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Bearer ${token}`,
        },
        agent: proxyServer != "None" ? new HttpsProxyAgent(proxyServer) : undefined
    }
}

const post = (token, path, message) => {
    return new Promise((resolve, reject) => {
        const payload = JSON.stringify(message)

        const options = getOptions(token, path)

        const req = https.request(options, (res) => {
            const chunks = [];
            res.on("data", (chunk) => {
                chunks.push(chunk);
            })
            
            res.on("end", ()=>{
                const result = Buffer.concat(chunks).toString();
                const response = JSON.parse(result);

                resolve({
                    statusCode: res.statusCode,
                    statusMessage: res.statusMessage,
                    ok: res.statusCode >= 200 && res.statusCode <= 299,
                    result: result,
                    response: response,
                })
            })
        })
        req.on("error", (error) => {
            reject(error)
        });
        req.write(payload);
        req.end();
    })
}

const apiPostMessage = async (token, message) => {
    const path = "/api/chat.postMessage";
    const result = await post(token, path, message);
     if( !result || !result.ok) {
        throw `Error! ${JSON.stringify(response)}`
     }
     return result;
}
module.exports = { apiPostMessage };