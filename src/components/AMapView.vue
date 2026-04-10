<!--
  AMapView.vue - 高德地图组件
  
  ★ 学习要点 ★
  1. 高德地图 JS API 2.0 的初始化方式
  2. AMap.Map 构造函数的参数配置
  3. AMap.Marker 标注点的添加
  4. AMap.InfoWindow 信息窗体的使用
  5. 深色地图主题 mapStyle
  6. Vue 3 中操作第三方地图库的最佳实践
-->

<template>
  <!--
    地图容器 - 必须有明确的宽高
    ref="mapRef" 用于在 JS 中获取 DOM 元素
  -->
  <div ref="mapRef" class="amap-wrapper"></div>
</template>

<script setup>
/**
 * 高德地图 Vue 3 封装组件
 * 
 * 高德地图的使用步骤：
 * 1. 在 index.html 中通过 <script> 引入高德地图 JS API
 * 2. 使用 new AMap.Map(dom, options) 创建地图实例
 * 3. 添加各种覆盖物（Marker、Polygon 等）
 * 4. 组件销毁时调用 map.destroy() 释放资源
 * 
 * 本组件聚焦：武汉市
 * 中心坐标：[114.3054, 30.5931]（武汉市中心）
 */

import { ref, onMounted, onBeforeUnmount } from 'vue'

// DOM 引用
const mapRef = ref(null)
// 地图实例（不需要响应式）
let map = null

// ---- 武汉市各区的标注数据 ----
// 每个对象包含：区名、经纬度坐标、描述信息
const wuhanDistricts = [
  {
    name: '武昌区',
    position: [114.3162, 30.5539],
    info: '面积：81.25 km²<br/>人口：128.6 万<br/>特点：省政府所在地，高校云集'
  },
  {
    name: '洪山区',
    position: [114.3438, 30.4998],
    info: '面积：509.53 km²<br/>人口：167.7 万<br/>特点：拥有众多高等院校和科研院所'
  },
  {
    name: '江汉区',
    position: [114.2709, 30.6012],
    info: '面积：33.43 km²<br/>人口：69.5 万<br/>特点：武汉最繁华的商业中心'
  },
  {
    name: '汉阳区',
    position: [114.2190, 30.5490],
    info: '面积：111.54 km²<br/>人口：84.5 万<br/>特点：知音故里，古琴台所在地'
  },
  {
    name: '江岸区',
    position: [114.3093, 30.6001],
    info: '面积：64.24 km²<br/>人口：96.2 万<br/>特点：历史租界区，沿江大道'
  },
  {
    name: '硚口区',
    position: [114.2153, 30.5818],
    info: '面积：41.46 km²<br/>人口：83.4 万<br/>特点：汉正街商贸区'
  },
  {
    name: '青山区',
    position: [114.3850, 30.6396],
    info: '面积：45.11 km²<br/>人口：52.9 万<br/>特点：武钢所在地，工业重镇'
  },
  {
    name: '东湖高新区',
    position: [114.4295, 30.4728],
    info: '面积：518 km²<br/>人口：188.2 万<br/>特点：中国光谷，高新技术产业集聚'
  },
  {
    name: '武汉经开区',
    position: [114.1580, 30.4888],
    info: '面积：489.7 km²<br/>人口：58.8 万<br/>特点：汽车产业基地，中国车谷'
  },
  {
    name: '黄陂区',
    position: [114.3748, 30.8815],
    info: '面积：2261 km²<br/>人口：102.2 万<br/>特点：木兰文化之乡，天河机场'
  },
  {
    name: '江夏区',
    position: [114.3139, 30.3471],
    info: '面积：2018 km²<br/>人口：91.3 万<br/>特点：汤逊湖畔，大学城'
  },
  {
    name: '蔡甸区',
    position: [114.0292, 30.5339],
    info: '面积：1093.57 km²<br/>人口：53.8 万<br/>特点：知音湖，中法生态城'
  }
]

/**
 * 初始化高德地图
 */
const initMap = () => {
  if (!mapRef.value) return

  // ★ 核心：创建地图实例 ★
  // new AMap.Map(容器DOM, 配置对象)
  map = new AMap.Map(mapRef.value, {
    // ---- 基础配置 ----
    zoom: 11,                    // 缩放级别（3-18，值越大越详细）
    center: [114.3054, 30.5931], // 地图中心点 [经度, 纬度]（武汉市中心）
    
    // ★ 深色地图主题 ★
    // 高德提供多种内置主题：
    // 'amap://styles/dark'     - 深色
    // 'amap://styles/light'    - 浅色
    // 'amap://styles/normal'   - 标准
    // 'amap://styles/darkblue' - 深蓝（非常适合大屏）
    mapStyle: 'amap://styles/darkblue',
    
    // ---- 交互配置 ----
    resizeEnable: true,          // 允许地图随容器 resize
    rotateEnable: false,         // 禁用旋转（大屏一般不需要）
    pitchEnable: false,          // 禁用俯仰
    
    // ---- 显示配置 ----
    viewMode: '2D',              // 2D 模式
    showBuildingBlock: false,    // 不显示建筑物
  })

  // 添加地图控件
  addControls()

  // 添加武汉各区的标注点
  addMarkers()
}

/**
 * 添加地图控件
 * 控件是地图上的辅助工具，如比例尺、缩放按钮等
 */
const addControls = () => {
  // ★ AMap.Scale - 比例尺控件 ★
  // 在地图左下角显示当前缩放级别对应的距离
  map.addControl(new AMap.Scale({
    position: 'LB'  // Left Bottom 左下角
  }))

  // ★ AMap.ToolBar - 工具栏控件 ★
  // 提供缩放按钮
  map.addControl(new AMap.ToolBar({
    position: 'RT',  // Right Top 右上角
    liteStyle: true  // 精简样式（更适合大屏）
  }))
}

/**
 * 添加标注点（Marker）
 * Marker 是地图上最常用的覆盖物，表示一个位置
 */
const addMarkers = () => {
  wuhanDistricts.forEach((district, index) => {
    // ★ 创建 Marker 标注点 ★
    const marker = new AMap.Marker({
      position: district.position,   // [经度, 纬度]
      title: district.name,          // 鼠标悬停提示

      // ★ 自定义标注点样式 ★
      // 使用 content 代替默认图标，可以完全自定义外观
      content: `
        <div style="
          position: relative;
          text-align: center;
        ">
          <div style="
            width: 12px;
            height: 12px;
            background: #00d4ff;
            border-radius: 50%;
            box-shadow: 0 0 12px rgba(0, 212, 255, 0.8), 0 0 24px rgba(0, 212, 255, 0.4);
            animation: markerPulse 2s ease-in-out infinite;
            animation-delay: ${index * 0.15}s;
          "></div>
          <div style="
            position: absolute;
            top: -22px;
            left: 50%;
            transform: translateX(-50%);
            white-space: nowrap;
            font-size: 11px;
            color: #00d4ff;
            text-shadow: 0 0 6px rgba(0, 212, 255, 0.5);
            font-family: 'Noto Sans SC', sans-serif;
            font-weight: 500;
          ">${district.name}</div>
        </div>
      `,
      offset: new AMap.Pixel(-6, -6),  // 偏移量，让标注点居中
    })

    // ★ 点击事件：弹出信息窗体 ★
    marker.on('click', () => {
      // 创建 InfoWindow（信息窗体）
      const infoWindow = new AMap.InfoWindow({
        // 窗体内容（支持 HTML）
        content: `
          <div style="
            padding: 8px 12px;
            font-family: 'Noto Sans SC', sans-serif;
            min-width: 180px;
          ">
            <h4 style="
              margin: 0 0 8px 0;
              color: #0066cc;
              font-size: 14px;
            ">${district.name}</h4>
            <div style="
              font-size: 12px;
              color: #333;
              line-height: 1.8;
            ">${district.info}</div>
          </div>
        `,
        offset: new AMap.Pixel(0, -20)  // 窗体偏移，避免遮挡标注点
      })

      // 在标注点位置打开信息窗体
      infoWindow.open(map, district.position)
    })

    // 将标注点添加到地图上
    map.add(marker)
  })
}

// ---- 生命周期 ----
onMounted(() => {
  // 延迟初始化，确保 DOM 已完全渲染
  setTimeout(() => {
    initMap()
  }, 100)
})

onBeforeUnmount(() => {
  // ★ 销毁地图实例，释放内存 ★
  if (map) {
    map.destroy()
    map = null
  }
})

// 注入 CSS 动画（Marker 脉冲效果）
const style = document.createElement('style')
style.textContent = `
  @keyframes markerPulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.5); opacity: 0.7; }
  }
`
document.head.appendChild(style)
</script>

<style scoped>
.amap-wrapper {
  width: 100%;
  height: 100%;
}

/* 隐藏高德地图的 logo 和版权信息（仅用于学习） */
:deep(.amap-logo),
:deep(.amap-copyright) {
  display: none !important;
}
</style>
