<template>
  <el-form :label-position="labelPosition" ref="ruleFormRef" style="max-width: 600px" :model="formValue" status-icon
    :rules="rules" label-width="auto" class="demo-ruleForm">
    <el-form-item label="账号" :label-position="itemLabelPosition">
      <el-input v-model="formValue.userAccount" />
    </el-form-item>
    <el-form-item label="密码" prop="userPassword" :label-position="itemLabelPosition">
      <el-input v-model="formValue.userPassword" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPassword" :label-position="itemLabelPosition">
      <el-input v-model="formValue.checkPassword" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit()">
        注册
      </el-button>
      <el-button class="login-button" type="primary" plain @click="router.push('/user/login')">
        去登录
      </el-button>
    </el-form-item>
  </el-form>

</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

import type { FormItemProps, FormProps } from 'element-plus'
import {userRegisterUsingPost } from '@/api/userController'

const labelPosition = ref<FormProps['labelPosition']>('right')
const itemLabelPosition = ref<FormItemProps['labelPosition']>('top')
const formValue = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: ""
} as API.UserRegisterRequest)
import type { FormInstance, FormRules } from 'element-plus'
import { useLoginUserStore } from '../../stores/user'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';
const loginUserStore = useLoginUserStore();
const router = useRouter();
const ruleFormRef = ref<FormInstance>()
/**
 * 提交表单（注册）
 * @param data
 */
const handleSubmit = async () => {
  const res = await userRegisterUsingPost(formValue);
  // 注册成功后跳转到登录页面
  if (res.data.code === 0) {
    await loginUserStore.fetchLoginUser();
    ElMessage({
      message: '注册成功，请登录吧',
      type: 'success',
    })
    router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    ElMessage({
      message: res.data.message,
      type: 'error',
    })
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (formValue.checkPassword !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass')
    }
    callback()
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请确认密码'))
  } else if (value !== formValue.userPassword) {
    callback(new Error("两次输入的密码不一致"))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<typeof formValue>>({
  userPassword: [{ validator: validatePass, trigger: 'blur' }],
  checkPassword: [{ validator: validatePass2, trigger: 'blur' }],
})


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
.login-button {
  margin-left: 167px;
}
</style>
