<template>
  <div class="ai-hub-home">
    <!-- 动态背景元素 -->
    <div class="animated-background">
      <div class="floating-circle" v-for="n in 5" :key="n"></div>
      <div class="gradient-overlay"></div>
    </div>

    <!-- 顶部 Banner -->
    <div class="banner">
      <el-row justify="center" align="middle">
        <el-col :span="20" class="banner-content">
          <h1 class="animated-title">AI 创作中心</h1>
          <p class="subtitle typing-text">一站式 AI 创作解决方案，激发无限创意</p>
          <div class="banner-features">
            <div class="feature-item" v-for="(feature, index) in features" :key="index"
              :style="{ animationDelay: `${index * 0.2}s` }">
              <div class="feature-icon-wrapper">
                <el-icon size="32">
                  <component :is="feature.icon" />
                </el-icon>
              </div>
              <span class="feature-text">{{ feature.text }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 移除分类导航，改为简单的标题 -->
    <div class="section-header">
      <h2>探索更多可能</h2>
      <p class="section-desc">选择你感兴趣的领域，开启 AI 创作之旅</p>
    </div>

    <!-- 应用卡片网格 -->
    <div class="apps-container">
      <el-row :gutter="20">
        <el-col v-for="(app, index) in apps" :key="app.id" :xs="24" :sm="12" :md="8" :lg="6" class="app-col"
          :style="{ animationDelay: `${index * 0.1}s` }">
          <div class="app-card" @click="handleAppClick(app.route)">
            <div class="lottie-container" :ref="el => { if (el) lottieContainers[index] = el }"></div>
            <div class="card-content">
              <h3>{{ app.name }}</h3>
              <p class="description">{{ app.description }}</p>
              <div class="features-list">
                <span v-for="(feature, fIndex) in app.features" :key="fIndex" class="feature-tag"
                  :style="{ animationDelay: `${fIndex * 0.1}s` }">
                  {{ feature }}
                </span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- Dify 聊天机器人 -->
    <div id="dify-chatbot-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import lottie from 'lottie-web'
import { initDifyChatbot, hideChatbot, resetChatbot } from '@/utils/difyChatbot'

const router = useRouter()
const lottieContainers = ref([])
const lottieInstances = ref([])

// 特性数据
const features = ref([
  { icon: 'ChatLineRound', text: '智能对话' },
  { icon: 'PictureFilled', text: '图像创作' },
  { icon: 'VideoPlay', text: '视频生成' }
])

// 应用数据
const apps = ref([
  {
    id: 1,
    name: '智能答题系统',
    description: 'AI 驱动的智能答题和评测系统',
    features: ['智能出题', '实时评测', '成长分析'],
    route: '/quiz/home',
    lottieFile: '/Lottie/bg.json'
  },
  {
    id: 2,
    name: 'AI 图像工坊',
    description: '一键生成精美图片，激发创意灵感',
    features: ['文生图', '图生图', '图片编辑'],
    route: '/image/home',
    lottieFile: '/Lottie/cargo.json'
  },
  {
    id: 3,
    name: '视频创作室',
    description: '轻松创作专业级视频内容',
    features: ['文生视频', '智能剪辑', '特效制作'],
    route: '/video/home',
    lottieFile: '/Lottie/fac.json'
  },
  {
    id: 4,
    name: '智能 BI 分析',
    description: 'AI 驱动的数据分析与可视化平台',
    features: ['自动分析', '智能可视化', '报告生成'],
    route: '/bi/home',
    lottieFile: '/Lottie/job.json'
  }
])

// 初始化 Lottie 动画
const initLottieAnimations = () => {
  apps.value.forEach((app, index) => {
    if (lottieContainers.value[index]) {
      const animation = lottie.loadAnimation({
        container: lottieContainers.value[index],
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: app.lottieFile
      })

      lottieInstances.value.push(animation)

      // 动画加载完成后，跳转到最后一帧
      animation.addEventListener('DOMLoaded', () => {
        const totalFrames = animation.totalFrames
        animation.goToAndStop(totalFrames - 1, true)
      })

      // 鼠标移入时从头开始播放
      lottieContainers.value[index].addEventListener('mouseenter', () => {
        animation.goToAndPlay(0)
        animation.setSpeed(1.2)
      })

      // 鼠标移出时停止并返回到最后一帧
      lottieContainers.value[index].addEventListener('mouseleave', () => {
        const totalFrames = animation.totalFrames
        animation.goToAndStop(totalFrames - 1, true)
      })
    }
  })
}

// 处理卡片点击
const handleAppClick = (route) => {
  if (route) {
    router.push(route)
  }
}

onMounted(() => {
  initLottieAnimations()
  initDifyChatbot()
})

// 清理动画实例和隐藏聊天机器人
onUnmounted(() => {
  lottieInstances.value.forEach(animation => {
    if (animation) {
      animation.destroy()
    }
  })
  hideChatbot()
})
</script>

<style scoped>
.ai-hub-home {
  padding: 24px;
  background: linear-gradient(135deg, #f5f7ff 0%, #f7f9fc 100%);
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

/* 添加动态背景图案 */
.ai-hub-home::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 15% 50%, rgba(106, 17, 203, 0.05) 0%, transparent 25%),
    radial-gradient(circle at 85% 30%, rgba(37, 117, 252, 0.05) 0%, transparent 25%);
  z-index: 0;
}

/* 添加动态网格背景 */
.ai-hub-home::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.8) 1px, transparent 1px);
  background-size: 30px 30px;
  opacity: 0.3;
  z-index: 0;
  animation: gridMove 20s linear infinite;
}

.banner {
  padding: 80px 0;
  background: linear-gradient(120deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(106, 17, 203, 0.15);
}

/* 添加波浪效果 */
.banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='0.1' d='M0,128L48,144C96,160,192,192,288,197.3C384,203,480,181,576,165.3C672,149,768,139,864,154.7C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E") bottom/cover no-repeat;
  animation: waveMove 20s linear infinite;
}

/* 添加浮动粒子效果 */
.banner::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle at center, #fff 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.1;
  animation: particleFloat 15s linear infinite;
}

.banner-content {
  position: relative;
  z-index: 1;
}

.banner h1 {
  font-size: 3.5em;
  margin-bottom: 16px;
  background: linear-gradient(to right, #fff, #e0e0e0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: titleGlow 2s ease-in-out infinite alternate;
}

.banner .subtitle {
  font-size: 1.4em;
  opacity: 0.9;
  margin-bottom: 40px;
}

.banner-features {
  display: flex;
  justify-content: center;
  gap: 80px;
  margin-top: 48px;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.feature-icon-wrapper {
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
}

.feature-icon-wrapper:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.feature-text {
  font-size: 18px;
  color: #fff;
  font-weight: 500;
}

.section-header {
  text-align: center;
  margin: 40px 0;
  padding: 0 20px;
}

.section-header h2 {
  font-size: 2em;
  color: #1a1a1a;
  margin-bottom: 12px;
}

.section-desc {
  color: #666;
  font-size: 1.1em;
}

/* 动画效果 */
@keyframes gridMove {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(30px);
  }
}

@keyframes waveMove {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

@keyframes particleFloat {
  0% {
    transform: translateY(0) rotate(0deg);
  }

  100% {
    transform: translateY(-50px) rotate(180deg);
  }
}

@keyframes titleGlow {
  from {
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  }

  to {
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
  }
}

/* 响应式调整 */
@media screen and (max-width: 768px) {
  .ai-hub-home {
    padding: 16px;
  }

  .banner {
    border-radius: 12px;
    padding: 60px 0;
  }

  .banner h1 {
    font-size: 2.5em;
  }

  .banner .subtitle {
    font-size: 1.2em;
  }

  .banner-features {
    flex-direction: column;
    gap: 32px;
  }

  .feature-item {
    flex-direction: row;
    gap: 24px;
  }

  .feature-icon-wrapper {
    width: 48px;
    height: 48px;
  }

  .section-header {
    padding: 0 16px;
  }
}

.apps-container {
  position: relative;
  z-index: 1;
}

.app-col {
  margin-bottom: 24px;
}

.app-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.lottie-container {
  width: 100%;
  height: 200px;
  background: #f5f7fa;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.card-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: white;
  border-radius: 0 0 12px 12px;
}

.card-content h3 {
  margin: 0;
  font-size: 20px;
  color: #333;
  font-weight: 600;
}

.description {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

.features-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
}

.feature-tag {
  padding: 6px 12px;
  background: rgba(var(--el-color-primary-rgb), 0.1);
  color: var(--el-color-primary);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
  animation: fadeInUp 0.5s ease forwards;
  opacity: 0;
  transform: translateY(10px);
  cursor: default;
  white-space: nowrap;
}

.feature-tag:hover {
  background: rgba(var(--el-color-primary-rgb), 0.15);
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(var(--el-color-primary-rgb), 0.2);
}

.app-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.app-card:hover .lottie-container {
  transform: scale(1.02);
}

/* 确保内容在背景之上 */
.banner-content,
.section-header,
.app-card {
  position: relative;
  z-index: 2;
}

/* 动态背景 */
.animated-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
}

.floating-circle {
  position: absolute;
  background: linear-gradient(45deg, var(--el-color-primary) 0%, var(--el-color-primary-light-3) 100%);
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.3;
  animation: floatAnimation 20s infinite linear;
}

.floating-circle:nth-child(1) {
  width: 300px;
  height: 300px;
  top: -150px;
  left: -150px;
  animation-duration: 15s;
}

.floating-circle:nth-child(2) {
  width: 400px;
  height: 400px;
  top: 40%;
  right: -200px;
  animation-duration: 25s;
}

.floating-circle:nth-child(3) {
  width: 250px;
  height: 250px;
  bottom: -100px;
  left: 30%;
  animation-duration: 20s;
}

.floating-circle:nth-child(4) {
  width: 200px;
  height: 200px;
  top: 20%;
  left: 20%;
  animation-duration: 18s;
}

.floating-circle:nth-child(5) {
  width: 350px;
  height: 350px;
  bottom: 10%;
  right: 20%;
  animation-duration: 22s;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, transparent 0%, rgba(255, 255, 255, 0.95) 100%);
}

/* 标题动画 */
.animated-title {
  animation: titleFloat 3s ease-in-out infinite;
  background: linear-gradient(45deg, #fff, #e0e0e0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
}

/* 打字机效果 */
.typing-text {
  overflow: hidden;
  white-space: nowrap;
  animation: typing 3s steps(40) 1s 1 normal both;
}

/* 卡片动画 */
.app-col {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

/* 动画关键帧 */
@keyframes floatAnimation {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }

  50% {
    transform: translate(100px, 100px) rotate(180deg);
  }

  100% {
    transform: translate(0, 0) rotate(360deg);
  }
}

@keyframes titleFloat {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

@keyframes typing {
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
