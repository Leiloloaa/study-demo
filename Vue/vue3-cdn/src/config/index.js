// 环境变量 生产环境或者是开发环境
const env = process.env.NODE_ENV

const config = {
    development: {
        baseURL: 'https://www.fastmock.site/mock/db08798339cea16d6af5706cac68bc0a/test/getProduction'
    },
    production: {
        baseURL: 'https://www.fastmock.site/mock/db08798339cea16d6af5706cac68bc0a/test/api/getList'
    }
}

export default {
    baseURL: config[env].baseURL
}