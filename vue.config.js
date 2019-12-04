module.exports = {
    publicPath: '/vue-element-admin-template',
    outputDir: 'dist/vue-element-admin-template',
    devServer: {
        port: 10080,
        disableHostCheck: true, // solve Invilid host header problem
        hotOnly: true, // 热更新
    }
}