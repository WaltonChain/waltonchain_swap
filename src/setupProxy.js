const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://127.0.0.1:3000',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    })
  )

  app.use(
    createProxyMiddleware('/bridge', {
      target: 'http://127.0.0.1:8091/api/bridge/bridge-order',
      changeOrigin: true,
      pathRewrite: {
        '^/bridge': ''
      }
    })
  )
}
