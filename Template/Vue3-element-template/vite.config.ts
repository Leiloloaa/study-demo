import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
const path = require('path')
export default defineConfig({
  alias: {
    "@": path.resolve('./src'),
    'styles': '@/styles',
    'asset': '@/asset'
  },
  server: {
    port: 3000,//启动端口
    open: true,
    proxy: {
      // 选项写法
      // '/api': 'http://123.56.85.24:5000'//代理网址
    },
    cors: true
  },
  css: {
    preprocessorOptions: {
      // 设置 scss 公用变量文件
      sass: {
        additionalData: `@import "./src/styles/index.scss";`
      }
    }
  },
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'element-plus',
          resolveStyle: (name) => {
            return `element-plus/lib/theme-chalk/${name}.css`;
          },
          resolveComponent: (name) => {
            return `element-plus/lib/${name}`;
          },
        }
      ]
    }),
  ],
})