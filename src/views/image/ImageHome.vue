<template>
  <div class="image-home">
    <!-- 顶部分类导航 -->
    <div class="category-nav">
      <div class="nav-scroll">
        <el-button v-for="category in categories" :key="category.id"
          :class="['category-item', { active: currentCategory === category.id }]"
          @click="handleCategoryChange(category.id)" text>
          {{ category.name }}
        </el-button>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="content-area">
      <!-- 瀑布流布局 -->
      <div class="masonry-container">
        <div v-for="image in images" :key="image.id" class="masonry-item">
          <div class="image-card">
            <div class="image-wrapper">
              <el-image :src="image.url" :alt="image.title" fit="cover" loading="lazy" @click="handleImageClick(image)">
                <template #placeholder>
                  <div class="image-placeholder">
                    <el-icon>
                      <Picture />
                    </el-icon>
                  </div>
                </template>
              </el-image>
              <div class="image-overlay">
                <div class="overlay-content">
                  <span class="views">
                    <el-icon>
                      <View />
                    </el-icon>
                    {{ formatNumber(image.views) }}
                  </span>
                  <span class="likes">
                    <el-icon>
                      <Star />
                    </el-icon>
                    {{ formatNumber(image.likes) }}
                  </span>
                </div>
              </div>
            </div>
            <div class="image-info">
              <div class="user-info">
                <el-avatar :size="20" :src="image.userAvatar" />
                <span class="username">{{ image.username }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 加载更多 -->
      <div class="load-more" v-if="hasMore" ref="loadMoreRef">
        <el-skeleton :loading="loading" animated>
          <template #template>
            <div class="loading-placeholder">
              <el-skeleton-item variant="text" style="width: 30%" />
            </div>
          </template>
          <template #default>
            <div class="loading-text">{{ loading ? '加载中...' : '滚动加载更多' }}</div>
          </template>
        </el-skeleton>
      </div>
    </div>

    <!-- 图片加载骨架屏 -->
    <template v-if="loading && !images.length">
      <div class="masonry-container">
        <div v-for="i in 12" :key="i" class="masonry-item">
          <el-skeleton animated>
            <template #template>
              <div class="image-card">
                <el-skeleton-item variant="image" style="width: 100%; height: 200px" />
                <div class="image-info">
                  <el-skeleton-item variant="text" style="width: 50%" />
                  <div class="info-bottom">
                    <el-skeleton-item variant="text" style="width: 30%" />
                  </div>
                </div>
              </div>
            </template>
          </el-skeleton>
        </div>
      </div>
    </template>

    <div class="upload-button">
      <el-button type="primary" size="large" @click="handleUpload">
        <el-icon>
          <Upload />
        </el-icon>
        上传图片
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Picture, View, Star, Upload } from '@element-plus/icons-vue'
import { ElImageViewer } from 'element-plus'
import { h } from 'vue'

// 分类数据
const categories = ref([
  { id: 'all', name: '全部' },
  { id: 'nature', name: '风光' },
  { id: 'portrait', name: '人像' },
  { id: 'architecture', name: '建筑' },
  { id: 'animal', name: '动物' },
  { id: 'plant', name: '植物' },
  { id: 'food', name: '美食' },
  { id: 'street', name: '街拍' },
  { id: 'creative', name: '创意' },
])

const currentCategory = ref('all')
const loading = ref(true)
const hasMore = ref(true)
const page = ref(1)

// 模拟图片数据
const images = ref([
  {
    id: 1,
    url: 'https://picsum.photos/300/400',
    title: '城市夜景',
    username: '夜景摄影师',
    userAvatar: 'https://picsum.photos/50/50?random=1',
    views: 12340,
    likes: 2356
  },
  {
    id: 2,
    url: 'https://picsum.photos/300/300',
    title: '自然风光',
    username: '风光摄影',
    userAvatar: 'https://picsum.photos/50/50?random=2',
    views: 8520,
    likes: 1234
  },
  {
    id: 3,
    url: 'https://picsum.photos/300/500',
    title: '人像写真',
    username: '人像摄影师',
    userAvatar: 'https://picsum.photos/50/50?random=3',
    views: 23456,
    likes: 4567
  },
  {
    id: 4,
    url: 'https://picsum.photos/300/400',
    title: '美食摄影',
    username: '美食家',
    userAvatar: 'https://picsum.photos/50/50?random=4',
    views: 5678,
    likes: 890
  },
  {
    id: 5,
    url: 'https://picsum.photos/300/650',
    title: '建筑之美',
    username: '建筑摄影',
    userAvatar: 'https://picsum.photos/50/50?random=5',
    views: 34567,
    likes: 6789
  },
  {
    id: 6,
    url: 'https://picsum.photos/300/350',
    title: '街头随拍',
    username: '街拍达人',
    userAvatar: 'https://picsum.photos/50/50?random=6',
    views: 9876,
    likes: 1543
  },
  {
    id: 7,
    url: 'https://picsum.photos/300/450',
    title: '宠物日常',
    username: '萌宠摄影师',
    userAvatar: 'https://picsum.photos/50/50?random=7',
    views: 15678,
    likes: 3456
  },
  {
    id: 8,
    url: 'https://picsum.photos/300/550',
    title: '植物特写',
    username: '自然摄影',
    userAvatar: 'https://picsum.photos/50/50?random=8',
    views: 7890,
    likes: 1234
  },
  {
    id: 9,
    url: 'https://picsum.photos/300/480',
    title: '创意构图',
    username: '创意摄影',
    userAvatar: 'https://picsum.photos/50/50?random=9',
    views: 45678,
    likes: 8901
  },
  {
    id: 10,
    url: 'https://picsum.photos/300/420',
    title: '旅行风景',
    username: '旅行摄影师',
    userAvatar: 'https://picsum.photos/50/50?random=10',
    views: 23456,
    likes: 4321
  },
  {
    id: 11,
    url: 'https://picsum.photos/300/580',
    title: '黑白艺术',
    username: '艺术摄影',
    userAvatar: 'https://picsum.photos/50/50?random=11',
    views: 89012,
    likes: 2345
  },
  {
    id: 12,
    url: 'https://picsum.photos/300/380',
    title: '运动瞬间',
    username: '体育摄影',
    userAvatar: 'https://picsum.photos/50/50?random=12',
    views: 67890,
    likes: 5678
  }
])

// 格式化数字
const formatNumber = (num: number) => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  }
  return num.toString()
}

// 处理分类切换
const handleCategoryChange = async (categoryId: string) => {
  currentCategory.value = categoryId
  page.value = 1
  images.value = [] // 清空当前图片
  await loadImages() // 重新加载图片
}

// 处理图片点击
const handleImageClick = (image: any) => {
  const imageUrl = image.url
  const instance = h(ElImageViewer, {
    urlList: [imageUrl],
    hideOnClickModal: true,
    onClose: () => {
      instance.component?.exposed?.close()
    }
  })
}

// 添加 ref 用于监听滚动
const loadMoreRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

// 设置观察器
const setupIntersectionObserver = () => {
  if (!loadMoreRef.value) return

  observer = new IntersectionObserver(
    async (entries) => {
      const target = entries[0]
      if (target.isIntersecting && !loading.value && hasMore.value) {
        await loadMore()
      }
    },
    {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    }
  )

  observer.observe(loadMoreRef.value)
}

// 加载更多图片
const loadMore = async () => {
  if (loading.value || !hasMore.value) return
  loading.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 1000))

    const newImages = Array.from({ length: 8 }, (_, index) => {
      const id = images.value.length + index + 1
      return {
        id,
        url: `https://picsum.photos/240/${Math.floor(Math.random() * 200 + 200)}?random=${id}`,
        title: `图片 ${id}`,
        username: `摄影师 ${id}`,
        userAvatar: `https://picsum.photos/50/50?random=${id}`,
        views: Math.floor(Math.random() * 90000 + 10000),
        likes: Math.floor(Math.random() * 9000 + 1000)
      }
    })

    images.value.push(...newImages)

    // 设置最大加载数量为200张
    if (images.value.length >= 200) {
      hasMore.value = false
    }
  } finally {
    loading.value = false
  }
}

const loadImages = async () => {
  loading.value = true
  try {
    // 模拟加载延迟
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 生成初始图片数据
    const newImages = Array.from({ length: 12 }, (_, index) => {
      const id = images.value.length + index + 1
      return {
        id,
        url: `https://picsum.photos/240/${Math.floor(Math.random() * 200 + 200)}?random=${id}`,
        title: `图片 ${id}`,
        username: `摄影师 ${id}`,
        userAvatar: `https://picsum.photos/50/50?random=${id}`,
        views: Math.floor(Math.random() * 90000 + 10000),
        likes: Math.floor(Math.random() * 9000 + 1000)
      }
    })

    images.value = newImages
    hasMore.value = true
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadImages()
  setupIntersectionObserver()
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})

const handleUpload = () => {
  // 实现上传图片的逻辑
}

const handleRefresh = async () => {
  page.value = 1
  images.value = []
  await loadImages()
}
</script>

<style scoped>
.image-home {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 12px;
}

.category-nav {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #fff;
  padding: 12px 0;
  margin: -12px -12px 12px -12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.nav-scroll {
  display: flex;
  overflow-x: auto;
  padding: 0 12px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.category-item {
  padding: 4px 12px;
  margin-right: 16px;
  font-size: 14px;
}

.category-item.active {
  color: var(--el-color-primary);
  font-weight: 500;
}

.category-item.active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 2px;
  background-color: var(--el-color-primary);
  border-radius: 2px;
}

.masonry-container {
  column-count: 8;
  column-gap: 8px;
  padding: 0 8px;
}

@media (max-width: 2000px) {
  .masonry-container {
    column-count: 7;
  }
}

@media (max-width: 1800px) {
  .masonry-container {
    column-count: 6;
  }
}

@media (max-width: 1400px) {
  .masonry-container {
    column-count: 5;
  }
}

@media (max-width: 1200px) {
  .masonry-container {
    column-count: 4;
  }
}

@media (max-width: 992px) {
  .masonry-container {
    column-count: 3;
  }
}

@media (max-width: 768px) {
  .masonry-container {
    column-count: 2;
  }
}

@media (max-width: 480px) {
  .masonry-container {
    column-count: 1;
  }
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 8px;
}

.image-card {
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

.image-wrapper {
  position: relative;
  overflow: hidden;
}

.image-wrapper .el-image {
  width: 100%;
  display: block;
  transition: transform 0.2s ease;
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 100%);
  padding: 20px 6px 6px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.overlay-content {
  display: flex;
  justify-content: space-between;
  color: #fff;
  font-size: 12px;
}

.image-card:hover .image-overlay {
  opacity: 1;
}

.image-card:hover .el-image {
  transform: scale(1.03);
}

.image-placeholder {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;
}

.image-info {
  padding: 6px 8px;
}

.user-info {
  gap: 4px;
}

.username {
  font-size: 12px;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.el-avatar {
  width: 16px;
  height: 16px;
}

.interaction-info span {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 11px;
}

.load-more {
  text-align: center;
  margin: 16px 0;
  padding: 10px 0;
}

.loading-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
}

.loading-text {
  color: #999;
  font-size: 14px;
}

.upload-button {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 100;
}
</style>
