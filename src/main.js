/**
 * main.js - 应用入口文件
 * 
 * 这是整个 Vue 3 应用的起点：
 * 1. 创建 Vue 应用实例
 * 2. 导入全局样式
 * 3. 将应用挂载到 DOM 上
 */

// createApp 是 Vue 3 的核心函数，用于创建应用实例
import { createApp } from 'vue'

// 导入全局 CSS 样式（大屏深色主题）
import './assets/styles/global.css'

// 导入根组件 - 整个应用的顶层组件
import App from './App.vue'

// 创建 Vue 应用实例并挂载到 index.html 中 id="app" 的 DOM 元素上
// createApp(App)：用 App 组件创建应用
// .mount('#app')：将应用渲染到页面上
createApp(App).mount('#app')
