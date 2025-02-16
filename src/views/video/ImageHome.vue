<template>
  <div class="video-center">
    <!-- 顶部标题区域 -->
    <div class="header">
      <h1>AI 视频创作室</h1>
      <p class="subtitle">智能视频生成与编辑,让创作更简单</p>
    </div>

    <!-- 主要功能区域 -->
    <el-row :gutter="20" class="features">
      <el-col :span="12">
        <div class="feature-content">
          <h3>文本生成视频</h3>
          <el-form :model="text2videoForm" label-width="80px">
            <el-form-item label="场景描述">
              <el-input
                v-model="text2videoForm.prompt"
                type="textarea"
                rows="4"
                placeholder="请描述您想要生成的视频场景"
              />
            </el-form-item>
            <el-form-item label="视频时长">
              <el-slider
                v-model="text2videoForm.duration"
                :min="5"
                :max="60"
                :step="5"
              />
              <span>{{ text2videoForm.duration }}秒</span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="generateVideo">生成视频</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>

      <el-col :span="12">
        <div class="feature-content">
          <h3>视频编辑</h3>
          <el-upload
            class="video-uploader"
            action="#"
            :auto-upload="false"
            :on-change="handleVideoChange"
          >
            <el-button type="primary">上传视频</el-button>
          </el-upload>

          <div class="video-actions mt-4">
            <el-button-group>
              <el-button @click="transformVideo">转换风格</el-button>
              <el-button @click="downloadVideo">下载视频</el-button>
              <el-button @click="shareVideo">分享视频</el-button>
            </el-button-group>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 预览区域 -->
    <div class="preview-area" v-if="previewUrl">
      <video
        class="preview-video"
        :src="previewUrl"
        controls
      ></video>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const text2videoForm = ref({
  prompt: '',
  duration: 15
})

const previewUrl = ref('')

const generateVideo = () => {
  // TODO: 调用 AI 接口生成视频
  console.log('生成视频', text2videoForm.value)
}

const handleVideoChange = (file: any) => {
  // TODO: 处理上传的视频
  console.log('上传视频', file)
}

const transformVideo = () => {
  // TODO: 调用 AI 接口转换视频风格
  console.log('转换视频风格')
}

const downloadVideo = () => {
  // TODO: 下载生成的视频
  console.log('下载视频')
}

const shareVideo = () => {
  // TODO: 分享视频
  console.log('分享视频')
}
</script>

<style scoped>
.video-center {
  padding: 20px 0;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 32px;
  color: #303133;
  margin-bottom: 12px;
}

.subtitle {
  font-size: 16px;
  color: #606266;
}

.features {
  margin-bottom: 40px;
}

.feature-content {
  padding: 20px;
  background: #f5f7fa;
  border-radius: 4px;
}

.feature-content h3 {
  margin-bottom: 20px;
  color: #303133;
}

.video-uploader {
  text-align: center;
  margin: 20px 0;
}

.preview-area {
  text-align: center;
  margin-top: 40px;
}

.preview-video {
  max-width: 100%;
  width: 640px;
  margin: 0 auto;
}

.video-actions {
  text-align: center;
}

.mt-4 {
  margin-top: 16px;
}
</style>
