'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
    publicPath: '/vue-element-admin-template',
    outputDir: 'dist/vue-element-admin-template',
    devServer: {
        port: 10080,
        disableHostCheck: true, // solve Invilid host header problem
        hotOnly: true, // 热更新
    },
    chainWebpack: config => {
        config.module
          .rule('svg')
          .exclude.add(resolve('src/icons'))
          .end()
        config.module
          .rule('icons')
          .test(/\.svg$/)
          .include.add(resolve('src/icons'))
          .end()
          .use('svg-sprite-loader')
          .loader('svg-sprite-loader')
          .options({
            symbolId: 'icon-[name]'
          })
          .end()
    }
}