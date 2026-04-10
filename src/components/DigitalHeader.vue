<!--
  DigitalHeader.vue - 武汉城市地理信息大屏标题栏
-->

<template>
  <header class="digital-header">
    <!-- 左侧装饰 -->
    <div class="header-decoration left">
      <div class="deco-line"></div>
      <div class="deco-dot"></div>
    </div>

    <!-- 中间标题 -->
    <div class="header-center">
      <h1 class="header-title">武 汉 市 地 理 信 息 监 控 中 心</h1>
      <p class="header-subtitle">Wuhan Geographic Information Monitoring Center</p>
    </div>

    <!-- 右侧时间 -->
    <div class="header-decoration right">
      <div class="header-time">{{ currentTime }}</div>
      <div class="header-date">{{ currentDate }}</div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const currentTime = ref('')
const currentDate = ref('')
let timer = null

const updateTime = () => {
  const now = new Date()
  currentTime.value = [now.getHours(), now.getMinutes(), now.getSeconds()]
    .map(n => String(n).padStart(2, '0')).join(':')
  currentDate.value = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.digital-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 24px;
  background: rgba(16, 24, 64, 0.6);
  border: 1px solid rgba(0, 212, 255, 0.15);
  border-radius: 10px;
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}

.digital-header::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00d4ff 20%, #7b68ee 50%, #00d4ff 80%, transparent);
  animation: headerGlow 3s ease-in-out infinite;
}

@keyframes headerGlow {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

.header-center { text-align: center; flex: 1; }

.header-title {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 8px;
  background: linear-gradient(135deg, #00d4ff, #7b68ee, #00d4ff);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: titleShine 4s linear infinite;
}

@keyframes titleShine {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

.header-subtitle {
  font-family: 'Orbitron', monospace;
  font-size: 9px;
  color: rgba(224, 230, 255, 0.4);
  letter-spacing: 3px;
  margin-top: 1px;
}

.header-decoration {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 140px;
}
.header-decoration.left { justify-content: flex-start; }
.header-decoration.right {
  justify-content: flex-end;
  flex-direction: column;
  align-items: flex-end;
  gap: 1px;
}

.deco-line {
  width: 80px; height: 2px;
  background: linear-gradient(90deg, #00d4ff, transparent);
}

.deco-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: #00d4ff;
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
  animation: dotPulse 2s ease-in-out infinite;
}

@keyframes dotPulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.7; }
}

.header-time {
  font-family: 'Orbitron', monospace;
  font-size: 16px; font-weight: 700;
  color: #00d4ff; letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
}

.header-date {
  font-family: 'Orbitron', monospace;
  font-size: 10px;
  color: rgba(224, 230, 255, 0.5);
}
</style>
