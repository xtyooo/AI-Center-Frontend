<template>
  <div class="bi-home">
    <!-- 上传区域 -->
    <el-card class="upload-section">
      <template #header>
        <div class="card-header">
          <h3>数据分析</h3>
        </div>
      </template>

      <el-form :model="analysisForm" label-width="120px">
        <!-- 分析目标 -->
        <el-form-item label="分析目标">
          <el-input v-model="analysisForm.goal" type="textarea" :rows="3"
            placeholder="请输入你想要分析的目标，例如：分析过去一年的销售趋势和影响因素" />
        </el-form-item>

        <!-- 数据上传 -->
        <el-form-item label="数据文件">
          <el-upload class="upload-demo" drag :action="uploadAction" :before-upload="beforeUpload"
            :on-success="handleUploadSuccess" :on-error="handleUploadError" accept=".csv,.xlsx,.xls">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              拖拽文件到此处或 <em>点击上传</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                支持 Excel、CSV 格式文件，最大 10MB
              </div>
            </template>
          </el-upload>
        </el-form-item>

        <!-- 分析按钮 -->
        <el-form-item>
          <el-button type="primary" :loading="analyzing" @click="startAnalysis">
            开始分析
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 分析结果展示 -->
    <el-card v-if="analysisResult" class="result-section">
      <template #header>
        <div class="card-header">
          <h3>分析结果</h3>
        </div>
      </template>

      <!-- 图表展示 -->
      <div class="charts-container">
        <el-row :gutter="20">
          <el-col v-for="(chart, index) in analysisResult.charts" :key="index" :span="12">
            <div class="chart-wrapper">
              <v-chart :option="chart.option" autoresize />
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- 分析结论 -->
      <div class="analysis-conclusion">
        <h4>分析结论</h4>
        <div v-html="analysisResult.conclusion"></div>
      </div>

      <!-- 导出按钮 -->
      <div class="export-actions">
        <el-button type="primary" @click="exportReport">
          导出分析报告
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart, BarChart, LineChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
} from 'echarts/components'
import VChart from 'vue-echarts'
import { UploadFilled } from '@element-plus/icons-vue'

// 注册必要的 ECharts 组件
use([
  CanvasRenderer,
  PieChart,
  BarChart,
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
])

// 响应式状态
const analysisForm = reactive({
  goal: '',
  file: null
})

const analyzing = ref(false)
const analysisResult = ref(null)
const uploadAction = '/api/bi/upload' // 替换为实际的上传接口

// 上传前验证
const beforeUpload = (file) => {
  const isValidType = ['application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/csv'].includes(file.type)
  const isLt10M = file.size / 1024 / 1024 < 10

  if (!isValidType) {
    ElMessage.error('只支持 Excel 或 CSV 格式文件！')
    return false
  }
  if (!isLt10M) {
    ElMessage.error('文件大小不能超过 10MB！')
    return false
  }
  return true
}

// 上传成功处理
const handleUploadSuccess = (response) => {
  analysisForm.file = response.data
  ElMessage.success('文件上传成功')
}

// 上传失败处理
const handleUploadError = () => {
  ElMessage.error('文件上传失败')
}

// 开始分析
const startAnalysis = async () => {
  if (!analysisForm.goal) {
    ElMessage.warning('请输入分析目标')
    return
  }
  if (!analysisForm.file) {
    ElMessage.warning('请上传数据文件')
    return
  }

  analyzing.value = true
  try {
    // 调用分析接口
    const response = await fetch('/api/bi/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        goal: analysisForm.goal,
        fileId: analysisForm.file.id
      })
    })

    const result = await response.json()
    if (result.success) {
      analysisResult.value = result.data
      ElMessage.success('分析完成')
    } else {
      throw new Error(result.message)
    }
  } catch (error) {
    ElMessage.error('分析失败：' + error.message)
  } finally {
    analyzing.value = false
  }
}

// 导出报告
const exportReport = async () => {
  try {
    const response = await fetch('/api/bi/export', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        result: analysisResult.value
      })
    })

    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = '分析报告.pdf'
    link.click()
    window.URL.revokeObjectURL(url)
  } catch (error) {
    ElMessage.error('导出失败：' + error.message)
  }
}
</script>

<style scoped>
.bi-home {
  padding: 20px;
}

.upload-section {
  margin-bottom: 20px;
}

.result-section {
  margin-top: 20px;
}

.charts-container {
  margin: 20px 0;
}

.chart-wrapper {
  height: 400px;
  margin-bottom: 20px;
}

.analysis-conclusion {
  margin: 20px 0;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.export-actions {
  margin-top: 20px;
  text-align: right;
}

:deep(.el-upload-dragger) {
  width: 100%;
}
</style>
