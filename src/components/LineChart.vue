<!--
  LineChart.vue - 武汉市交通流量趋势折线图
  
  ★ 学习要点 ★
  1. 多折线对比（长江大桥 vs 二桥 vs 三桥）
  2. smooth 平滑曲线和 areaStyle 面积填充
  3. legend 图例区分不同系列
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
  chartOption.value = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(16, 24, 64, 0.9)',
      borderColor: 'rgba(0, 212, 255, 0.3)',
      textStyle: { color: '#e0e6ff' }
    },
    legend: {
      data: ['长江大桥', '二七长江大桥', '白沙洲大桥'],
      textStyle: { color: 'rgba(224, 230, 255, 0.7)', fontSize: 10 },
      top: '0%',
      itemWidth: 15,
      itemHeight: 8
    },
    grid: {
      left: '3%', right: '4%', bottom: '3%', top: '18%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      // 24 小时时间标签
      data: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'],
      axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.3)' } },
      axisLabel: { color: 'rgba(224, 230, 255, 0.7)', fontSize: 9 }
    },
    yAxis: {
      type: 'value',
      name: '车流量/千',
      nameTextStyle: { color: 'rgba(224, 230, 255, 0.5)', fontSize: 9 },
      splitLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.08)' } },
      axisLabel: { color: 'rgba(224, 230, 255, 0.7)', fontSize: 9 }
    },
    series: [
      {
        name: '长江大桥',
        type: 'line',
        smooth: true,
        data: [1.2, 0.5, 0.8, 8.5, 6.2, 7.8, 9.6, 4.5, 1.8],
        lineStyle: { width: 2, color: '#00d4ff' },
        itemStyle: { color: '#00d4ff' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(0, 212, 255, 0.25)' },
            { offset: 1, color: 'rgba(0, 212, 255, 0.02)' }
          ])
        },
        symbol: 'circle',
        symbolSize: 4
      },
      {
        name: '二七长江大桥',
        type: 'line',
        smooth: true,
        data: [0.8, 0.3, 0.6, 7.2, 5.5, 6.9, 8.8, 3.8, 1.2],
        lineStyle: { width: 2, color: '#7b68ee' },
        itemStyle: { color: '#7b68ee' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(123, 104, 238, 0.2)' },
            { offset: 1, color: 'rgba(123, 104, 238, 0.02)' }
          ])
        },
        symbol: 'circle',
        symbolSize: 4
      },
      {
        name: '白沙洲大桥',
        type: 'line',
        smooth: true,
        data: [0.6, 0.2, 0.5, 6.8, 4.9, 6.2, 8.1, 3.2, 0.9],
        lineStyle: { width: 2, color: '#00e676' },
        itemStyle: { color: '#00e676' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(0, 230, 118, 0.2)' },
            { offset: 1, color: 'rgba(0, 230, 118, 0.02)' }
          ])
        },
        symbol: 'circle',
        symbolSize: 4
      }
    ],
    animationDuration: 2000
  }
})
</script>
