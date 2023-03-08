const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
    }) ,
    createProxyMiddleware({
      target:  "http://10.125.121.170:3000",
      changeOrigin: true,
    })
  );
};