<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
    @select="handleSelect">
    <el-menu-item index="0">
      <img style="width: 55px" src="../assets/_001.svg" alt="Element logo" />
    </el-menu-item>
    <el-menu-item v-for="route in visibleRoutes" :key="route.path" :index="route.path">{{ route.name
      }}</el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <div v-if="!isLogin">
          <a-button type="primary" href="/user/login">登录</a-button>
          <!-- 没登陆显示 登录 鼠标停滞弹出下来菜单可选择登录或注册   已登录显示头像 鼠标停滞弹出下来菜单可选择退出登录 -->
        </div>
        <div v-if="isLogin">
          <el-avatar :src="loginUserStore.loginUser?.userAvatar " style="margin-bottom: 8px;" />

        </div>

      </template>

      <!-- 没登陆显示 登录 鼠标停滞弹出下来菜单可选择登录或注册   已登录显示头像 鼠标停滞弹出下来菜单可选择退出登录 -->

      <template v-if="!isLogin">

        <el-menu-item index="2-1">登录</el-menu-item>
        <el-menu-item index="2-2">注册</el-menu-item>
      </template>
      <template v-if="isLogin">
        <el-menu-item index="2-3">退出登录</el-menu-item>
      </template>


    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

const isLogin = ref(false)
import { useRouter } from 'vue-router'
import checkAccess from '@/access/checkAccess';
import { useLoginUserStore } from '../stores/user'



const router = useRouter()


const loginUserStore = useLoginUserStore()

//我想去除掉routes中path: '/user'的路由，怎么写
// router.options.routes = router.options.routes.filter(route => route.path !== '/user')


console.log(router.options.routes)

if (loginUserStore.loginUser) {
  isLogin.value = true
}



// 展示在菜单栏的路由数组
const visibleRoutes = computed(() => {
  return router.options.routes.filter((item) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤菜单
    if (!checkAccess(loginUserStore.loginUser, item.meta?.access as string)) {
      return false;
    }
    return true;
  });
});

console.log(visibleRoutes)
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
  if (key.startsWith('/')) {
    router.push(key)
  }
  if (key === '2-3' || key === '2-1') {
    isLogin.value = false
    router.push('/user/login')
  }
  if (key === '2-2') {
    isLogin.value = false
    router.push('/user/register')
  }




}
</script>

<style scoped>
.el-menu--horizontal>.el-menu-item:nth-child(1) {
  margin-right: auto;
}

.el-menu--horizontal {
  --el-menu-horizontal-height: 55px;
}

.demo-type {
  display: flex;
}

.demo-type>div {
  flex: 1;
  text-align: center;
}

.demo-type>div:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}
/* 背景透明 */
.el-menu--horizontal {
  background-color: transparent;
}
</style>
