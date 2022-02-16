// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const cdn = {
    // 开发环境
    dev: {
        css: [],
        js: []
    },
    // 生产环境
    build: {
        css: ['https://unpkg.com/element-plus/lib/theme-chalk/index.css'],
        js: [
            // 在 bootCnd 上找到相应版本的 cdn 在 index 中引入
            'https://cdn.bootcdn.net/ajax/libs/vue/3.2.0-beta.7/vue.runtime.global.prod.js',
            'https://cdn.bootcdn.net/ajax/libs/vue-router/4.0.6/vue-router.global.js',
            'https://cdn.bootcdn.net/ajax/libs/vuex/4.0.0/vuex.global.js',
            'https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.js',
            'https://cdn.bootcdn.net/ajax/libs/element-plus/1.0.2-beta.44/index.full.js',
            'https://cdn.bootcdn.net/ajax/libs/element-plus/1.0.2-beta.44/umd/locale/zh-cn.js',
            'https://unpkg.com/dayjs/locale/zh-cn.js'
        ]
    }
};

module.exports = {
    chainWebpack: config => {
        // 只在生产环境使用 cdn
        if (process.env.NODE_ENV === 'production') {
            // 忽略 vue 和 moment 这两个模块
            config.externals({
                vue: 'Vue'
            });

            // 修改 HtmlWebpackPlugin 插件参数，植入 cdns 这个模板参数，值为 Vue3 和 Moment.js 的 cdn 链接
            config.plugin('html').tap(args => {
                args[0].cdn = cdn.build;
                return args;
            });
        }
    },
    // publicPath: './'
    // publicPath: process.env.NODE_ENV === 'production' ? '/dist' : '/'
    // 生产环境就是 当前目录下 
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/';
    // publicPath: './'
}