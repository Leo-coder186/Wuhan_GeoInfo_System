<!--
  BarChart.vue - 武汉市各区人口分布柱状图
  
  ★ 学习要点 ★
  1. xAxis / yAxis 互换实现横向条形图
  2. 渐变色柱体
  3. 数据标签（label）的显示
-->

<template>
  <BaseChart :option="chartOption" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BaseChart from './BaseChart.vue'
import * as echarts from 'echarts'

const chartOption = ref({})

onMounted(() => {
  // 武汉市各区人口数据（单位：万人，模拟数据）
  const districts = ['东湖高新', '洪山区', '武昌区', '黄陂区', '江岸区', '江夏区', '汉阳区', '硚口区']
  const population = [188.2, 167.7, 128.6, 102.2, 96.2, 91.3, 84.5, 83.4]

  chartOption.value = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },  // 阴影指示器（适合柱状图）
      backgroundColor: 'rgba(16, 24, 64, 0.9)',
      borderColor: 'rgba(0, 212, 255, 0.3)',
      textStyle: { color: '#e0e6ff' },
      formatter: '{b}: {c} 万人'
    },
    grid: {
      left: '3%', right: '12%', bottom: '3%', top: '5%',
      containLabel: true
    },

    // ★ 横向条形图技巧：将类目轴放在 yAxis ★
    // 普通柱状图：xAxis=类目, yAxis=数值
    // 横向条形图：xAxis=数值, yAxis=类目
    xAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.08)' } },
      axisLabel: { color: 'rgba(224, 230, 255, 0.7)', fontSize: 10 }
    },
    yAxis: {
      type: 'category',
      data: districts.reverse(),  // 反转让最大值在上面
      axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.3)' } },
      axisLabel: { color: 'rgba(224, 230, 255, 0.8)', fontSize: 10 }
    },
    series: [{
      type: 'bar',
      data: population.reverse(),
      barWidth: '55%',
      // ★ label: 在柱体上直接显示数值 ★
      label: {
        show: true,
        position: 'right',      // 显示在柱体右侧
        color: 'rgba(224, 230, 255, 0.7)',
        fontSize: 10,
        formatter: '{c} 万'
      },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: '#003366' },
          { offset: 1, color: '#00d4ff' }
        ]),
        borderRadius: [0, 4, 4, 0]
      }
    }],
    animationDuration: 1500,
    animationEasing: 'cubicOut'
  }
})
</script>
