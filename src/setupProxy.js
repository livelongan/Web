const { createProxyMiddleware } = require('http-proxy-middleware')
const { HttpsAgent } = require('agentkeepalive')
const processEnv = process.env

const keepaliveAgent = new HttpsAgent({
    maxSockets: 100,
    keepAlive: true,
    maxFreeSockets: 10,
    keepAliveMsecs: 1000,
    timeout: 600000,
     keepAliveTimeout: 30000,
})

module.exports = function setup(app) {
    app.use(
        '/mobx/API',
        createProxyMiddleware({
            target: processEnv.DEBUG_API_ENDPOINT,
            changeOrigin: true,
            pathRewrite: {
                '^/mobx\\/API/': '/', //remove base path

                auth: 'LOGIN:LPASS',
                agent: keepaliveAgent,
                secure: false,
                headers:
                    processEnv.DEBUG_API_KEY != null
                        ? { 'Api-Key': processEnv.DEBUG_API_KEY }
                        : {},
            },
            onProxyReq: (proxyReq) => {
                proxyReq.removeHeader('Origin')
            },
            onProxyRes: (proxyRes) => {
                var key = 'www-authenticate'
                proxyRes.headers[key] =
                    proxyRes.headers[key] &&
                    proxyRes.headers[key].split(',')
            }
        })
    )
}
