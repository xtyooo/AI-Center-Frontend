<template>
  <div class="header-wrapper">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
      @select="handleSelect">
      <el-menu-item index="0">
        <img style="width: 55px" src="../assets/_001.svg" alt="Element logo" />
      </el-menu-item>
      <el-menu-item v-for="route in visibleRoutes" :key="route.path" :index="route.path">
        {{ route.name }}
      </el-menu-item>
      <div class="flex-grow" />
      <el-sub-menu index="2">
        <template #title>
          <div v-if="!isLogin">
            <a-button type="primary" href="/user/login">登录</a-button>
          </div>
          <div v-if="isLogin">
            <el-avatar :src="loginUserStore.loginUser?.userAvatar" style="margin-bottom: 8px;" />
          </div>
        </template>
        <template v-if="!isLogin">
          <el-menu-item index="2-1">登录</el-menu-item>
          <el-menu-item index="2-2">注册</el-menu-item>
        </template>
        <template v-if="isLogin">
          <el-menu-item index="2-3">退出登录</el-menu-item>
        </template>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { DataAnalysis } from '@element-plus/icons-vue'

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
.header-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
}

.el-menu--horizontal {
  --el-menu-horizontal-height: 55px;
  border-bottom: none !important;
}

.flex-grow {
  flex-grow: 1;
}

:deep(.el-menu) {
  border-bottom: none !important;
  background-color: transparent;
}

:deep(.el-menu-item) {
  height: 55px;
  line-height: 55px;
  color: var(--el-text-color-primary) !important;
  font-size: 14px;
}

:deep(.el-menu-item.is-active) {
  color: var(--el-color-primary) !important;
  background-color: transparent;
}

:deep(.el-menu-item:not(.is-disabled):hover) {
  color: var(--el-color-primary) !important;
  background-color: rgba(var(--el-color-primary-rgb), 0.1);
}

:deep(.el-sub-menu__title) {
  height: 55px;
  line-height: 55px;
  color: var(--el-text-color-primary) !important;
}

:deep(.el-sub-menu__title:hover) {
  background-color: rgba(var(--el-color-primary-rgb), 0.1) !important;
}

:deep(.el-menu--popup) {
  background-color: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
  border-radius: 4px;
  padding: 4px 0;
}

:deep(.el-menu--popup .el-menu-item) {
  height: 40px;
  line-height: 40px;
}

:deep(.el-menu--popup .el-menu-item:hover) {
  background-color: rgba(var(--el-color-primary-rgb), 0.1);
}
</style>
