<!--
  GaugeChart.vue - 武汉市空气质量 AQI 仪表盘
  
  ★ 学习要点 ★
  1. 仪表盘的颜色分段配置（优/良/轻度污染等）
  2. axisLine.lineStyle.color 分段着色
  3. 定时器实现动态数据更新
-->

<template>
  <BaseChart :option="chartOption" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import BaseChart from './BaseChart.vue'

const chartOption = ref({})
let timer = null

onMounted(() => {
  updateChart(72)
  // 每 4 秒模拟 AQI 数据变化
  timer = setInterval(() => {
    const value = Math.floor(Math.random() * 80 + 30) // 30~110
    updateChart(value)
  }, 4000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

/**
 * 根据 AQI 值返回对应的等级文字
 * AQI 标准：0-50 优，51-100 良，101-150 轻度，151-200 中度
 */
function getAQILevel(value) {
  if (value <= 50) return '优'
  if (value <= 100) return '良'
  if (value <= 150) return '轻度污染'
  return '中度污染'
}

function updateChart(value) {
  chartOption.value = {
    series: [{
      type: 'gauge',
      min: 0,
      max: 200,       // AQI 最大 200
      startAngle: 220,
      endAngle: -40,
      progress: {
        show: true,
        width: 14,
        roundCap: true,
        itemStyle: {
          // 根据 AQI 值动态设置颜色
          color: value <= 50 ? '#00e676' :
                 value <= 100 ? '#00d4ff' :
                 value <= 150 ? '#ffab40' : '#ff5252'
        }
      },
      pointer: {
        length: '50%',
        width: 5,
        itemStyle: {
          color: value <= 50 ? '#00e676' :
                 value <= 100 ? '#00d4ff' :
                 value <= 150 ? '#ffab40' : '#ff5252'
        }
      },
      axisTick: {
        distance: -20,
        length: 5,
        lineStyle: { color: 'rgba(0, 212, 255, 0.3)', width: 1 }
      },
      axisLabel: {
        distance: -16,
        color: 'rgba(224, 230, 255, 0.5)',
        fontSize: 9
      },
      splitLine: {
        distance: -24,
        length: 10,
        lineStyle: { color: 'rgba(0, 212, 255, 0.4)', width: 2 }
      },
      // ★ 背景轨道分段颜色 ★
      // 格式：[[百分比, 颜色], ...]
      // 将 AQI 0-200 映射到 0-1
      axisLine: {
        roundCap: true,
        lineStyle: {
          width: 14,
          color: [
            [0.25, 'rgba(0, 230, 118, 0.15)'],   // 0-50：优（绿色）
            [0.5,  'rgba(0, 212, 255, 0.15)'],    // 51-100：良（蓝色）
            [0.75, 'rgba(255, 171, 64, 0.15)'],   // 101-150：轻度（橙色）
            [1,    'rgba(255, 82, 82, 0.15)']     // 151-200：中度（红色）
          ]
        }
      },
      anchor: {
        show: true,
        size: 12,
        itemStyle: {
          color: '#0a0e27',
          borderColor: value <= 100 ? '#00d4ff' : '#ffab40',
          borderWidth: 2
        }
      },
      detail: {
        valueAnimation: true,
        fontSize: 22,
        fontFamily: 'Orbitron',
        fontWeight: 700,
        color: value <= 50 ? '#00e676' :
               value <= 100 ? '#00d4ff' :
               value <= 150 ? '#ffab40' : '#ff5252',
        offsetCenter: [0, '65%'],
        formatter: `{value}\n${getAQILevel(value)}`
      },
      title: {
        fontSize: 11,
        color: 'rgba(224, 230, 255, 0.6)',
        offsetCenter: [0, '88%']
      },
      data: [{
        value: value,
        name: 'AQI 指数'
      }]
    }],
    animationDuration: 800,
    animationDurationUpdate: 800,
    animationEasing: 'cubicInOut'
  }
}
</script>
