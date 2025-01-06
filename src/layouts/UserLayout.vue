<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <UserHeader />
      </el-header>
      <el-main class="main">

        <router-view />
      </el-main>
      <el-footer class="footer">Coding By xtyooo</el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import UserHeader from '@/components/UserHeader.vue'
</script>

<style scoped>
.common-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: url("https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png") 0% 0% / 100% 100%;
}


.el-main {

  margin-bottom: 28px;
  padding: 20px;
}

.el-footer {
  padding: 16px;
  margin-top: auto;
  text-align: center;
}
</style>
