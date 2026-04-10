<!--
  App.vue - 武汉市地理信息大屏主布局
  
  ★ 布局结构 ★
  ┌──────────────────────────────────────────┐
  │           标题栏 (DigitalHeader)          │
  ├────────┬──────────────────┬──────────────┤
  │ 左面板  │   高德地图        │  右面板      │
  │ 人口    │   (AMapView)     │  交通流量    │
  │ GDP     │                  │  AQI        │
  │ 产业    │                  │  城市评估    │
  ├────────┴──────────────────┴──────────────┤
  │         底部统计栏 (NumberRoll)           │
  └──────────────────────────────────────────┘
-->

<template>
  <div class="dashboard">

    <!-- ====== 顶部标题栏 ====== -->
    <DigitalHeader />

    <!-- ====== 主内容区域：左-中-右三栏 ====== -->
    <div class="main-content">

      <!-- ---- 左侧面板 ---- -->
      <div class="side-panel left-panel">
        <!-- 人口分布 -->
        <div class="chart-card">
          <div class="chart-title">各区人口分布</div>
          <div class="chart-wrapper">
            <BarChart />
          </div>
        </div>
        <!-- GDP 排名 - 用另一种风格的柱状图 -->
        <div class="chart-card">
          <div class="chart-title">产业结构占比</div>
          <div class="chart-wrapper">
            <PieChart />
          </div>
        </div>
        <!-- 交通流量 -->
        <div class="chart-card">
          <div class="chart-title">跨江大桥车流量</div>
          <div class="chart-wrapper">
            <LineChart />
          </div>
        </div>
      </div>

      <!-- ---- 中间地图区域 ---- -->
      <div class="map-container">
        <AMapView />
      </div>

      <!-- ---- 右侧面板 ---- -->
      <div class="side-panel right-panel">
        <!-- AQI 仪表盘 -->
        <div class="chart-card">
          <div class="chart-title">空气质量实时监测</div>
          <div class="chart-wrapper">
            <GaugeChart />
          </div>
        </div>
        <!-- 城市综合评估 -->
        <div class="chart-card">
          <div class="chart-title">城市综合评估</div>
          <div class="chart-wrapper">
            <RadarChart />
          </div>
        </div>
        <!-- 气温趋势 -->
        <div class="chart-card">
          <div class="chart-title">近 7 日气温趋势</div>
          <div class="chart-wrapper">
            <WeatherChart />
          </div>
        </div>
      </div>

    </div>

    <!-- ====== 底部统计栏 ====== -->
    <div class="stats-bar">
      <div class="stat-item">
        <span class="stat-label">总 面 积 (km²)</span>
        <NumberRoll :value="8569" :duration="2500" class="stat-value" />
      </div>
      <div class="stat-item">
        <span class="stat-label">常住人口 (万)</span>
        <NumberRoll :value="stats.population" :duration="2500" class="stat-value" />
      </div>
      <div class="stat-item">
        <span class="stat-label">GDP (亿元)</span>
        <NumberRoll :value="stats.gdp" :duration="2500" class="stat-value" />
      </div>
      <div class="stat-item">
        <span class="stat-label">今 日 车 流 (万)</span>
        <NumberRoll :value="stats.traffic" :duration="2500" class="stat-value" />
      </div>
    </div>

  </div>
</template>

<script setup>
/**
 * App.vue - 武汉市地理信息大屏根组件
 * 
 * 职责：
 * 1. 三栏布局（左面板 + 地图 + 右面板）
 * 2. 组织所有子组件
 * 3. 管理底部统计数据（模拟实时更新）
 */

import { reactive, onMounted, onBeforeUnmount } from 'vue'

// 导入所有子组件
import DigitalHeader from './components/DigitalHeader.vue'
import AMapView from './components/AMapView.vue'
import BarChart from './components/BarChart.vue'
import LineChart from './components/LineChart.vue'
import PieChart from './components/PieChart.vue'
import GaugeChart from './components/GaugeChart.vue'
import RadarChart from './components/RadarChart.vue'
import WeatherChart from './components/WeatherChart.vue'
import NumberRoll from './components/NumberRoll.vue'

// 武汉市统计数据
const stats = reactive({
  population: 1374,   // 常住人口（万人）
  gdp: 18866,         // GDP（亿元）
  traffic: 285        // 今日车流量（万次）
})

let timer = null

onMounted(() => {
  // 模拟实时数据更新
  timer = setInterval(() => {
    stats.traffic += Math.floor(Math.random() * 5 + 1)
  }, 5000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
/* App.vue 的局部样式，大部分布局在 global.css 中定义 */
</style>
