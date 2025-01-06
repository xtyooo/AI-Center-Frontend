<template>
  <el-form :label-position="labelPosition" label-width="auto" :model="formValue" style="max-width: 600px">

    <el-form-item label="账号" :label-position="itemLabelPosition">
      <el-input v-model="formValue.userAccount" />
    </el-form-item>
    <el-form-item label="密码" :label-position="itemLabelPosition">
      <el-input v-model="formValue.userPassword" type="password" />
    </el-form-item>
    <!-- <el-form-item label="Activity form" :label-position="itemLabelPosition">
      <el-input v-model="formLabelAlign.type" />
    </el-form-item> -->
    <el-form-item>
      <el-button class="login-button" type="primary" @click="handleSubmit()">
        登录
      </el-button>
      <el-button class="register-button" type="primary" plain @click="router.push('/user/register')">
        去注册
      </el-button>
    </el-form-item>
  </el-form>

</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

import type { FormItemProps, FormProps } from 'element-plus'
import { userLoginUsingPost } from '@/api/userController'

const labelPosition = ref<FormProps['labelPosition']>('right')
const itemLabelPosition = ref<FormItemProps['labelPosition']>('top')
const formValue = reactive({
  userAccount: "",
  userPassword: "",
} as API.UserLoginRequest)

import { useLoginUserStore } from '../../stores/user'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';

const loginUserStore = useLoginUserStore();
const router = useRouter();
/**
 * 提交表单（登录）
 * @param data
 */
const handleSubmit = async () => {
  const res = await userLoginUsingPost(formValue);
  // 登录成功，跳转到主页
  if (res.data.code === 0) {
    await loginUserStore.fetchLoginUser();
    ElMessage({
      message: '登录成功',
      type: 'success',
    })
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    ElMessage({
      message: res.data.message,
      type: 'error',
    })
  }
};




</script>

<style scoped>
/* 居中 */
.el-form {
  margin: 0 auto;
  padding-top: 100px;
  transform: translateX(25%);
}
/* 输入框短一点 */
.el-input {
  width: 300px;
}
/* 登录按钮和注册按钮分局两侧 */
.register-button {
  margin-left: 167px;
}

</style>
