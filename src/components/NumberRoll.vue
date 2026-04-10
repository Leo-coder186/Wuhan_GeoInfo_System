<!--
  NumberRoll.vue - 数字滚动动画组件
  
  ★ 学习要点 ★
  1. Vue 3 的 watch 监听 props 变化
  2. requestAnimationFrame 实现流畅动画
  3. 缓动函数（easing）让动画更自然
  4. 组件封装：通过 props 自定义行为
-->

<template>
  <!--
    显示滚动的数字
    class 绑定让我们可以动态添加样式
  -->
  <span class="number-roll">{{ displayValue }}</span>
</template>

<script setup>
/**
 * 数字滚动组件：
 * 当目标数字改变时，显示的数字会从当前值"滚动"到目标值
 * 效果类似大屏上实时更新的统计数字
 */

import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

// ---- Props 定义 ----
const props = defineProps({
  // 目标数值
  value: {
    type: Number,
    default: 0
  },
  // 动画持续时间（毫秒）
  duration: {
    type: Number,
    default: 2000
  },
  // 是否使用千分位分隔（如 1,234,567）
  separator: {
    type: Boolean,
    default: true
  }
})

// 当前显示的值
const displayValue = ref('0')
let animationFrame = null   // 动画帧ID，用于取消动画

/**
 * 缓动函数 - easeOutExpo
 * 让数字变化从快到慢，视觉效果更自然
 * t: 当前时间进度 (0 ~ 1)
 */
const easeOutExpo = (t) => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

/**
 * 格式化数字：添加千分位分隔符
 * 例：1234567 → "1,234,567"
 */
const formatNumber = (num) => {
  if (!props.separator) return String(Math.floor(num))
  return Math.floor(num).toLocaleString('en-US')
}

/**
 * 执行数字滚动动画
 * 使用 requestAnimationFrame 实现 60fps 流畅动画
 */
const animateTo = (target) => {
  // 取消正在进行的动画
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }

  const startValue = parseInt(displayValue.value.replace(/,/g, '')) || 0
  const startTime = performance.now()  // 高精度时间戳

  const animate = (currentTime) => {
    // 计算已经过了多少时间（0~1）
    const elapsed = Math.min((currentTime - startTime) / props.duration, 1)
    
    // 应用缓动函数
    const progress = easeOutExpo(elapsed)
    
    // 计算当前应该显示的值
    const currentValue = startValue + (target - startValue) * progress
    
    // 更新显示
    displayValue.value = formatNumber(currentValue)

    // 如果动画未完成，继续下一帧
    if (elapsed < 1) {
      animationFrame = requestAnimationFrame(animate)
    }
  }

  // 启动动画
  animationFrame = requestAnimationFrame(animate)
}

// ---- 生命周期 ----
onMounted(() => {
  // 组件挂载时，从 0 滚动到目标值
  animateTo(props.value)
})

onBeforeUnmount(() => {
  // 清除动画，防止组件销毁后仍在执行
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})

// ---- 监听 value 变化 ----
// 当父组件更新 value 时，自动播放滚动动画
watch(() => props.value, (newVal) => {
  animateTo(newVal)
})
</script>

<style scoped>
/*
  scoped: 样式只作用于当前组件，不会污染全局
  Vue 会给元素添加 data-v-xxx 属性来实现样式隔离
*/
.number-roll {
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  /* 渐变色文字 */
  background: linear-gradient(135deg, #00d4ff, #7b68ee);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
