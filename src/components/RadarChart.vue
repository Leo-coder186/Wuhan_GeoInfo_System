<!--
  RadarChart.vue - 武汉市城市综合评估雷达图
  
  ★ 学习要点 ★
  1. radar.indicator 定义评估维度
  2. 多组数据对比（武汉 vs 全国平均）
  3. areaStyle 面积填充
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
      textStyle: { color: '#e0e6ff' }
    },
    legend: {
      data: ['武汉市', '全国均值'],
      textStyle: { color: 'rgba(224, 230, 255, 0.7)', fontSize: 10 },
      bottom: '2%',
      itemWidth: 15,
      itemHeight: 8
    },
    radar: {
      // ★ 城市评估的 6 个维度 ★
      indicator: [
        { name: '经济实力', max: 100 },
        { name: '交通指数', max: 100 },
        { name: '教育资源', max: 100 },
        { name: '医疗水平', max: 100 },
        { name: '生态环境', max: 100 },
        { name: '科技创新', max: 100 }
      ],
      shape: 'polygon',
      center: ['50%', '48%'],
      radius: '60%',
      splitArea: {
        areaStyle: {
          color: [
            'rgba(0, 212, 255, 0.02)',
            'rgba(0, 212, 255, 0.04)',
            'rgba(0, 212, 255, 0.02)',
            'rgba(0, 212, 255, 0.04)',
            'rgba(0, 212, 255, 0.02)'
          ]
        }
      },
      splitLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.15)' } },
      axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.15)' } },
      axisName: { color: 'rgba(224, 230, 255, 0.7)', fontSize: 10 }
    },
    series: [{
      type: 'radar',
      data: [
        {
          name: '武汉市',
          value: [85, 78, 92, 80, 68, 88],
          lineStyle: { color: '#00d4ff', width: 2 },
          itemStyle: { color: '#00d4ff' },
          areaStyle: { color: 'rgba(0, 212, 255, 0.15)' }
        },
        {
          name: '全国均值',
          value: [70, 65, 72, 68, 72, 65],
          lineStyle: { color: '#7b68ee', width: 2 },
          itemStyle: { color: '#7b68ee' },
          areaStyle: { color: 'rgba(123, 104, 238, 0.1)' }
        }
      ],
      symbol: 'circle',
      symbolSize: 5
    }],
    animationDuration: 1500
  }
})
</script>
