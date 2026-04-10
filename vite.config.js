// vite.config.js - Vite 构建工具的配置文件
// Vite 是新一代前端构建工具，比 webpack 更快

import { defineConfig } from 'vite'  // 引入 Vite 配置函数，提供类型提示
import vue from '@vitejs/plugin-vue'  // 引入 Vue 3 插件，让 Vite 能处理 .vue 文件

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue()  // 启用 Vue 3 支持
  ],
  // 开发服务器配置
  server: {
    port: 3000,        // 开发服务器端口
    open: true         // 启动时自动打开浏览器
  }
})
