<template>
  <div class="register-container">
    <div class="register-box">
      <!-- 标题区域 -->
      <div class="title-area">
        <h1>AI 创作中心</h1>
        <p class="subtitle">开启你的 AI 创作之旅</p>
      </div>

      <!-- 注册表单 -->
      <el-form :model="formValue" ref="ruleFormRef" :rules="rules" class="register-form"
        :label-position="labelPosition">
        <el-form-item prop="userAccount">
          <el-input v-model="formValue.userAccount" :prefix-icon="User" placeholder="请输入账号" size="large" />
        </el-form-item>

        <el-form-item prop="userPassword">
          <el-input v-model="formValue.userPassword" :prefix-icon="Lock" type="password" placeholder="请输入密码"
            size="large" show-password />
        </el-form-item>

        <el-form-item prop="checkPassword">
          <el-input v-model="formValue.checkPassword" :prefix-icon="Lock" type="password" placeholder="请确认密码"
            size="large" show-password />
        </el-form-item>

        <el-form-item>
          <el-button class="register-button" type="primary" @click="handleSubmit()" size="large" :loading="loading">
            注册
          </el-button>
        </el-form-item>

        <div class="form-footer">
          <span>已有账号？</span>
          <el-button type="primary" link @click="router.push('/user/login')">
            立即登录
          </el-button>
        </div>
      </el-form>
    </div>

    <!-- 背景动画 -->
    <div class="animated-background">
      <div class="gradient-circle"></div>
      <div class="gradient-circle"></div>
      <div class="gradient-circle"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormProps, FormInstance, FormRules } from 'element-plus'
import { userRegisterUsingPost } from '@/api/userController'
import { useLoginUserStore } from '../../stores/user'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { User, Lock } from '@element-plus/icons-vue'

const labelPosition = ref<FormProps['labelPosition']>('top')
const loading = ref(false)
const ruleFormRef = ref<FormInstance>()

const formValue = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: ""
} as API.UserRegisterRequest)

const loginUserStore = useLoginUserStore()
const router = useRouter()

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (formValue.checkPassword !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPassword')
    }
    callback()
  }
}

const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请确认密码'))
  } else if (value !== formValue.userPassword) {
    callback(new Error("两次输入的密码不一致"))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  userAccount: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 4, message: '账号长度不能小于4位', trigger: 'blur' },
  ],
  userPassword: [{ validator: validatePass, trigger: 'blur' }],
  checkPassword: [{ validator: validatePass2, trigger: 'blur' }],
})

const handleSubmit = async () => {
  if (!ruleFormRef.value) return

  await ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        const res = await userRegisterUsingPost(formValue)
        if (res.data.code === 0) {
          ElMessage.success('注册成功，请登录')
          router.push({
            path: "/user/login",
            replace: true,
          })
        } else {
          ElMessage.error(res.data.message || '注册失败')
        }
      } catch (error) {
        ElMessage.error('注册失败，请稍后重试')
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f7ff 0%, #f7f9fc 100%);
  margin: 0;
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.register-box {
  width: 420px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 1;
  animation: fadeIn 0.6s ease-out;
  flex-shrink: 0;
  margin: 20px;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.08),
    0 0 1px rgba(0, 0, 0, 0.1);
}

.title-area {
  text-align: center;
  margin-bottom: 40px;
}

.title-area h1 {
  font-size: 28px;
  color: var(--el-color-primary);
  margin: 0 0 8px 0;
  font-weight: 600;
  background: linear-gradient(45deg, var(--el-color-primary), #409eff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 16px;
  color: #666;
  margin: 0;
}

.register-form {
  width: 100%;
}

.register-form :deep(.el-input) {
  --el-input-hover-border-color: var(--el-color-primary);
}

.register-form :deep(.el-input__wrapper) {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.register-form :deep(.el-input__wrapper:hover) {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.register-button {
  width: 100%;
  height: 44px;
  font-size: 16px;
  background: linear-gradient(45deg, var(--el-color-primary), #409eff);
  border: none;
  margin-top: 20px;
}

.register-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}

.form-footer {
  margin-top: 20px;
  text-align: center;
  color: #666;
}

/* 背景动画 */
.animated-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
}

.gradient-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  animation: float 20s infinite linear;
}

.gradient-circle:nth-child(1) {
  width: 600px;
  height: 600px;
  background: linear-gradient(45deg, rgba(106, 17, 203, 0.1), rgba(37, 117, 252, 0.1));
  top: -10%;
  left: -10%;
  animation-duration: 30s;
}

.gradient-circle:nth-child(2) {
  width: 400px;
  height: 400px;
  background: linear-gradient(45deg, rgba(37, 117, 252, 0.1), rgba(106, 17, 203, 0.1));
  bottom: -5%;
  right: -5%;
  animation-duration: 25s;
}

.gradient-circle:nth-child(3) {
  width: 300px;
  height: 300px;
  background: linear-gradient(45deg, rgba(106, 17, 203, 0.1), rgba(37, 117, 252, 0.1));
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-duration: 20s;
}

@keyframes float {
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

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 响应式适配 */
@media screen and (max-width: 576px) {
  .register-box {
    width: calc(100% - 40px);
    padding: 30px 20px;
    margin: 20px;
  }

  .register-container {
    padding: 0;
  }

  .title-area h1 {
    font-size: 24px;
  }

  .subtitle {
    font-size: 14px;
  }
}
</style>
