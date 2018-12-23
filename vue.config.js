module.exports = {
  // 基本路径
  baseUrl: '/staff',
  outputDir: 'dist/staff',
  lintOnSave: true,
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: "index.html"
    }
  },
  chainWebpack: () => {},
  configureWebpack: () => {},
  productionSourceMap: true,
  // css相关配置
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {},
    modules: false,
  },
  parallel: require('os').cpus().length > 1,
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    // 设置代理
    proxy: {
      '/staff/v1': {
        target: 'https://api.testing.pipacoding.com',
        changeOrigin: true
      },
      '/staff/v2': {
        target: 'https://api.testing.pipacoding.com',
        changeOrigin: true
      }
    },
    disableHostCheck: true
    // before: (app) => {},
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  },
};
