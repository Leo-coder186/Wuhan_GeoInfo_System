<!--
  WeatherChart.vue - 武汉市近 7 日气温趋势折线图
  
  ★ 学习要点 ★
  1. 双 Y 轴配置（温度 + 湿度）
  2. 柱状图 + 折线图混合使用
  3. 不同系列使用不同的 yAxisIndex
-->

<template>
  <BaseChart :option="chartOption" />
</template>

<script setup>
/**
 * 气温趋势图：结合折线图和柱状图
 * - 折线：温度趋势
 * - 柱状：降水概率
 * 
 * ★ 混合图表是 ECharts 的强大特性 ★
 * 只需在不同 series 里设置不同 type 即可
 */

import { ref, onMounted } from 'vue'
import BaseChart from './BaseChart.vue'
import * as echarts from 'echarts'

const chartOption = ref({})

onMounted(() => {
  // 获取最近7天的日期标签
  const days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(`${d.getMonth() + 1}/${d.getDate()}`)
  }

  chartOption.value = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(16, 24, 64, 0.9)',
      borderColor: 'rgba(0, 212, 255, 0.3)',
      textStyle: { color: '#e0e6ff' }
    },
    legend: {
      data: ['最高温', '最低温', '降水概率'],
      textStyle: { color: 'rgba(224, 230, 255, 0.7)', fontSize: 9 },
      top: '0%',
      itemWidth: 12,
      itemHeight: 8
    },
    grid: {
      left: '3%', right: '6%', bottom: '3%', top: '20%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: days,
      axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.3)' } },
      axisLabel: { color: 'rgba(224, 230, 255, 0.7)', fontSize: 9 }
    },

    // ★ 双 Y 轴：左边温度，右边降水概率 ★
    yAxis: [
      {
        type: 'value',
        name: '°C',
        nameTextStyle: { color: 'rgba(224, 230, 255, 0.5)', fontSize: 9 },
        splitLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.08)' } },
        axisLabel: { color: 'rgba(224, 230, 255, 0.7)', fontSize: 9 }
      },
      {
        type: 'value',
        name: '%',
        nameTextStyle: { color: 'rgba(224, 230, 255, 0.5)', fontSize: 9 },
        splitLine: { show: false },
        axisLabel: { color: 'rgba(224, 230, 255, 0.5)', fontSize: 9 }
      }
    ],

    series: [
      {
        name: '最高温',
        type: 'line',
        smooth: true,
        data: [18, 22, 20, 25, 23, 19, 21],
        lineStyle: { color: '#ff5252', width: 2 },
        itemStyle: { color: '#ff5252' },
        symbol: 'circle',
        symbolSize: 4,
        yAxisIndex: 0  // 使用第 0 个 Y 轴（左边）
      },
      {
        name: '最低温',
        type: 'line',
        smooth: true,
        data: [8, 12, 10, 14, 13, 9, 11],
        lineStyle: { color: '#00d4ff', width: 2 },
        itemStyle: { color: '#00d4ff' },
        symbol: 'circle',
        symbolSize: 4,
        yAxisIndex: 0
      },
      {
        name: '降水概率',
        type: 'bar',
        data: [20, 10, 60, 30, 45, 70, 25],
        barWidth: '30%',
        yAxisIndex: 1,  // ★ 使用第 1 个 Y 轴（右边）★
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(123, 104, 238, 0.6)' },
            { offset: 1, color: 'rgba(123, 104, 238, 0.1)' }
          ]),
          borderRadius: [3, 3, 0, 0]
        }
      }
    ],
    animationDuration: 1500
  }
})
</script>
