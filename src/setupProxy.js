const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api': '/api',
      },
      onProxyReq: (proxyReq) => {
        // Add any required headers here if needed
        // proxyReq.setHeader('Authorization', `Bearer ${process.env.REACT_APP_API_KEY}`);
      },
      onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).json({ error: 'Proxy Error', details: err.message });
      }
    })
  );
};
