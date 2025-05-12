<template>
  <div class="global-header">
    <div class="left">
      <div class="logo">
        <img src="../assets/_001.svg" alt="logo" />
      </div>
      <h2 class="system-name">{{ currentSystemName }}</h2>
    </div>

    <el-menu :default-active="activeMenu" class="el-menu-demo" mode="horizontal" router>
      <el-menu-item v-for="item in visibleRoutes" :key="item.path" :index="item.path">
        {{ item.name }}
      </el-menu-item>
    </el-menu>

    <!-- 添加用户信息区域 -->
    <div class="user-actions">
      <template v-if="loginUserStore.loginUser">
        <el-dropdown @command="handleCommand">
          <div class="user-info">
            <el-avatar :size="32"
              :src="loginUserStore.loginUser.userAvatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
            <span class="username">{{ loginUserStore.loginUser.userName }}</span>
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
      <template v-else>
        <el-button type="primary" link @click="toLogin">登录</el-button>
        <el-divider direction="vertical" />
        <el-button type="primary" link @click="toRegister">注册</el-button>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { DataAnalysis, ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import checkAccess from '@/access/checkAccess'
import { useLoginUserStore } from '../stores/user'
import { ElMessage } from 'element-plus'

const isLogin = ref(false)

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
  // 获取当前路由路径
  const currentPath = router.currentRoute.value.path;

  // 获取当前路径的根路径（例如 /quiz/home 得到 /quiz）
  const baseRoute = '/' + currentPath.split('/')[1];

  // 创建返回首页的路由项
  const homeRoute = {
    path: '/home',
    name: '返回首页',
  };

  // 如果在首页，只显示主要系统入口
  if (currentPath === '/') {
    return router.options.routes.filter((item) => {
      return !item.meta?.hideInMenu && !item.path.includes('/');
    });
  }

  // 在子系统中，先添加返回首页选项，再添加子系统的菜单项
  const filteredRoutes = router.options.routes.filter((item) => {
    // 过滤出当前子系统的路由
    if (!item.path.startsWith(baseRoute)) {
      return false;
    }

    // 根据权限过滤菜单
    if (!checkAccess(loginUserStore.loginUser, item.meta?.access as string)) {
      return false;
    }

    // 对于子系统路由，显示未标记 hideInMenu 的项
    return !item.meta?.hideInMenu;
  });

  // 将返回首页添加到路由列表最前面
  return [homeRoute, ...filteredRoutes];
});

// 修复 activeMenu 未定义的错误
const activeMenu = computed(() => {
  return router.currentRoute.value.path;
});

// 添加一个用于显示当前系统名称的计算属性
const currentSystemName = computed(() => {
  const currentPath = router.currentRoute.value.path;
  const baseRoute = '/' + currentPath.split('/')[1];

  const systemNames: Record<string, string> = {
    '/quiz': '智能答题系统',
    '/image': 'AI 图像工坊',
    '/video': '视频创作室',
    '/bi': '智能 BI 分析'
  };

  return systemNames[baseRoute] || 'AI 创作中心';
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

// 新增用户操作相关方法
const toLogin = () => {
  router.push('/user/login')
}

const toRegister = () => {
  router.push('/user/register')
}

const handleCommand = (command: string) => {
  if (command === 'logout') {
    loginUserStore.setLoginUser(null)
    ElMessage.success('退出登录成功')
    router.push('/user/login')
  }
}
</script>

<style scoped>
.global-header {
  display: flex;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  background-color: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color-light);
  position: relative;
  z-index: 1000;
}

.left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: fit-content;
  /* 确保左侧内容不会被压缩 */
}

.system-name {
  font-size: 18px;
  color: var(--el-color-primary);
  margin: 0;
  white-space: nowrap;
  /* 防止系统名称换行 */
}

/* 菜单样式 */
:deep(.el-menu) {
  flex: 1;
  border-bottom: none !important;
  background-color: transparent;
  white-space: nowrap;
  /* 防止菜单项换行 */
  overflow-x: auto;
  /* 内容过多时允许横向滚动 */
  scrollbar-width: none;
  /* Firefox */
  position: relative;
  z-index: 1000;
}

/* 隐藏滚动条（Chrome/Safari） */
:deep(.el-menu)::-webkit-scrollbar {
  display: none;
}

:deep(.el-menu-item) {
  height: 55px;
  line-height: 55px;
  padding: 0 16px;
  font-size: 14px;
  color: var(--el-text-color-primary) !important;
  position: relative;
  z-index: 1000;
}

:deep(.el-menu-item.is-active) {
  color: var(--el-color-primary) !important;
  background-color: transparent;
}

:deep(.el-menu-item:not(.is-disabled):hover) {
  color: var(--el-color-primary) !important;
  background-color: rgba(var(--el-color-primary-rgb), 0.1);
}

/* 确保菜单容器不会被压缩 */
.el-menu-demo {
  min-width: 0;
  margin-left: 20px;
}

/* 响应式布局 */
@media screen and (max-width: 768px) {
  .global-header {
    padding: 0 10px;
  }

  .system-name {
    font-size: 16px;
  }

  :deep(.el-menu-item) {
    padding: 0 12px;
  }
}

.user-actions {
  margin-left: auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  z-index: 1001;
}

.user-info {
  position: relative;
  z-index: 1001;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.3s;
}

.user-info:hover {
  background: var(--el-fill-color-light);
}

.username {
  font-size: 14px;
  color: var(--el-text-color-regular);
  margin-right: 4px;
}

:deep(.el-divider--vertical) {
  height: 16px;
  margin: 0 8px;
}

/* 响应式处理 */
@media screen and (max-width: 768px) {
  .username {
    display: none;
  }

  .user-actions {
    padding: 0 10px;
  }
}

/* 确保下拉菜单可见 */
:deep(.el-popper) {
  z-index: 1002 !important;
}

/* 确保菜单项可点击 */
:deep(.el-menu) {
  position: relative;
  z-index: 1000;
}

:deep(.el-menu-item) {
  position: relative;
  z-index: 1000;
}
</style>
