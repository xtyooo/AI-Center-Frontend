import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getLoginUserUsingGet } from '@/api/userController'

import ACCESS_ENUM from '@/access/accessEnum'

export const useLoginUserStore = defineStore('counter', () => {
  const loginUser = ref<API.LoginUserVO>({
    userName: '未登录',
  })

  async function fetchLoginUser() {
    // 调用接口获取用户信息
    const res = await getLoginUserUsingGet()
    if (res.data.code === 0 && res.data.data) {
      loginUser.value = res.data.data
    } else {
      loginUser.value = {
        userRole: ACCESS_ENUM.NOT_LOGIN,
      }
    }
  }

  function setLoginUser(user: API.LoginUserVO | null) {
    if (user === null) {
      loginUser.value = {
        userRole: ACCESS_ENUM.NOT_LOGIN,
      }
    } else {
      loginUser.value = user
    }
  }

  return { loginUser, fetchLoginUser, setLoginUser }
})
