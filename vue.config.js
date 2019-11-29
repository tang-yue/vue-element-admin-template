module.exports = {
    publicPath: '/fe-user-growth',
    outputDir: 'dist/fe-user-growth',
    devServer: {
        port: 10080,
        disableHostCheck: true, // solve Invilid host header problem
        hotOnly: true, // 热更新
        proxy: {
            '/staff/v1': {
                target:  "https://api.testing.pipacoding.com",
                changeOrigin: true,
            },
            '/staff/v2': {
                target: 'https://api.testing.pipacoding.com',
                changeOrigin: true
            }
        }
    }
}