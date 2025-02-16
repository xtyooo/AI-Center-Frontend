<template>
  <div class="image-center">
    <!-- 顶部标题区域 -->
    <div class="header">
      <el-row justify="center">
        <el-col :span="16">
          <h1>AI 图像工坊</h1>
          <p class="subtitle">使用 AI 技术,轻松创作精美图片</p>
        </el-col>
      </el-row>
    </div>

    <!-- 功能区域 -->
    <div class="features">
      <el-row justify="center">
        <el-col :span="16">
          <el-tabs v-model="activeTab">
            <el-tab-pane label="文生图" name="text2img">
              <div class="feature-content">
                <el-form :model="text2imgForm" label-width="80px">
                  <el-form-item label="文本描述">
                    <el-input
                      v-model="text2imgForm.prompt"
                      type="textarea"
                      placeholder="请输入图片描述文本"
                      :rows="4"
                    />
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="generateImage">生成图片</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>

            <el-tab-pane label="图生图" name="img2img">
              <div class="feature-content">
                <el-upload
                  class="upload-demo"
                  drag
                  action="#"
                  :auto-upload="false"
                  :on-change="handleImageChange"
                >
                  <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                  <div class="el-upload__text">
                    拖拽图片到此处或 <em>点击上传</em>
                  </div>
                </el-upload>
                <el-button type="primary" class="mt-4" @click="transformImage">转换图片</el-button>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>

    <!-- 结果展示区域 -->
    <div class="result" v-if="generatedImage">
      <el-row justify="center">
        <el-col :span="16">
          <el-card>
            <img :src="generatedImage" class="generated-image" />
            <div class="image-actions">
              <el-button type="primary" @click="downloadImage">下载图片</el-button>
              <el-button @click="shareImage">分享</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'

const activeTab = ref('text2img')
const text2imgForm = ref({
  prompt: ''
})
const generatedImage = ref('')

const generateImage = () => {
  // TODO: 调用 AI 接口生成图片
  console.log('生成图片', text2imgForm.value.prompt)
}

const handleImageChange = (file: any) => {
  // TODO: 处理上传的图片
  console.log('上传图片', file)
}

const transformImage = () => {
  // TODO: 调用 AI 接口转换图片
  console.log('转换图片')
}

const downloadImage = () => {
  // TODO: 下载生成的图片
  console.log('下载图片')
}

const shareImage = () => {
  // TODO: 分享图片
  console.log('分享图片')
}
</script>

<style scoped>
.image-center {
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

.generated-image {
  width: 100%;
  max-width: 512px;
  display: block;
  margin: 0 auto;
}

.image-actions {
  margin-top: 20px;
  text-align: center;
}

.mt-4 {
  margin-top: 16px;
}
</style>



