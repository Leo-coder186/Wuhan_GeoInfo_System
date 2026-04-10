<!--
  BaseChart.vue - ECharts 通用封装组件
  
  ★ 这是最核心的组件，理解它就理解了 ECharts + Vue 3 的结合方式 ★
  
  功能：
  1. 自动创建和销毁 ECharts 实例
  2. 监听 option 变化，自动更新图表
  3. 监听窗口大小变化，自动 resize
  
  使用方式：
  <BaseChart :option="chartOption" />
-->

<template>
  <!--
    div 容器：ECharts 需要一个有宽高的 DOM 元素来渲染图表
    ref="chartRef" 让我们能在 JS 中获取这个 DOM 元素
    style 设置宽高100%，让图表填满父容器
  -->
  <div ref="chartRef" style="width: 100%; height: 100%;"></div>
</template>

<script setup>
/**
 * Vue 3 <script setup> 语法：
 * - 是 Composition API 的语法糖
 * - 不需要 return，所有顶层变量自动暴露给模板
 * - 用 defineProps 定义组件属性
 */

import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'

// ---- 引入 ECharts ----
// 按需引入可以减小打包体积，但这里为了学习方便，引入全部
import * as echarts from 'echarts'

// ---- 定义组件的 Props（父组件传入的属性）----
const props = defineProps({
  // option: ECharts 的配置对象，这是图表的"灵魂"
  // 包含 title、legend、xAxis、yAxis、series 等配置
  option: {
    type: Object,
    required: true  // 必传
  }
})

// ---- 响应式引用 ----
// ref() 创建响应式数据
// chartRef 会自动绑定到模板中 ref="chartRef" 的 DOM 元素
const chartRef = ref(null)    // DOM 元素引用
let chartInstance = null       // ECharts 实例（不需要响应式）

/**
 * 初始化 ECharts 图表
 * 这个函数在组件挂载后调用
 */
const initChart = () => {
  if (!chartRef.value) return

  // echarts.init() 是 ECharts 的核心 API
  // 参数1: DOM 容器
  // 参数2: 主题（null 表示默认主题）
  // 参数3: 配置项（renderer 可选 'canvas' 或 'svg'）
  chartInstance = echarts.init(chartRef.value, null, {
    renderer: 'canvas'  // canvas 渲染器，性能更好
  })

  // setOption() 设置图表配置
  // 传入 option 后，ECharts 会自动渲染图表
  if (props.option) {
    chartInstance.setOption(props.option)
  }
}

/**
 * 处理窗口大小变化
 * 大屏应用经常需要适配不同分辨率
 */
const handleResize = () => {
  // resize() 让图表重新计算尺寸并重绘
  chartInstance?.resize()
}

// ---- 生命周期钩子 ----

// onMounted：组件挂载到 DOM 后执行
// 此时 chartRef.value 才能获取到真实的 DOM 元素
onMounted(() => {
  // nextTick 确保 DOM 完全渲染后再初始化
  nextTick(() => {
    initChart()
    // 监听窗口 resize 事件
    window.addEventListener('resize', handleResize)
  })
})

// onBeforeUnmount：组件销毁前执行
// 必须清理资源，防止内存泄漏！
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  // dispose() 销毁 ECharts 实例，释放内存
  chartInstance?.dispose()
  chartInstance = null
})

// ---- 监听器 ----

// watch：监听 props.option 的变化
// 当父组件更新 option 时，图表自动更新
watch(
  () => props.option,
  (newOption) => {
    if (chartInstance && newOption) {
      // setOption 第二个参数 true 表示不合并，完全替换旧配置
      // 这样可以避免旧数据残留
      chartInstance.setOption(newOption, true)
    }
  },
  { deep: true }  // 深度监听，option 内部属性变化也能检测到
)
</script>
