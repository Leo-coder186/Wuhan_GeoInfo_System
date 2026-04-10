<!--
  PieChart.vue - 武汉市产业结构占比饼图
  
  ★ 学习要点 ★
  1. 环形饼图（设置内外半径）
  2. 自定义颜色方案
  3. 标签格式化
-->

<template>
  <BaseChart :option="chartOption" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BaseChart from './BaseChart.vue'

const chartOption = ref({})

onMounted(() => {
  chartOption.value = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(16, 24, 64, 0.9)',
      borderColor: 'rgba(0, 212, 255, 0.3)',
      textStyle: { color: '#e0e6ff' },
      formatter: '{b}: {c} 亿元 ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: '5%',
      top: 'center',
      textStyle: { color: 'rgba(224, 230, 255, 0.7)', fontSize: 10 },
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8
    },
    series: [{
      name: '武汉市 GDP 结构',
      type: 'pie',
      radius: ['35%', '65%'],  // 环形图
      center: ['40%', '50%'],
      // ★ 自定义标签 ★
      label: {
        color: 'rgba(224, 230, 255, 0.8)',
        fontSize: 10,
        formatter: '{b}\n{d}%'
      },
      labelLine: {
        lineStyle: { color: 'rgba(0, 212, 255, 0.3)' }
      },
      itemStyle: {
        borderColor: 'rgba(10, 14, 39, 0.8)',
        borderWidth: 2
      },
      // 武汉市三大产业结构数据（模拟）
      data: [
        { value: 350, name: '第一产业', itemStyle: { color: '#00e676' } },
        { value: 5800, name: '第二产业', itemStyle: { color: '#00d4ff' } },
        { value: 12500, name: '第三产业', itemStyle: { color: '#7b68ee' } },
      ],
      emphasis: {
        scaleSize: 8,
        itemStyle: {
          shadowBlur: 15,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }],
    animationDuration: 1500
  }
})
</script>
