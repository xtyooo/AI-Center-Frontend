<template>
  <div class="quiz-layout">
    <el-container>
      <el-header>
        <QuizHeader />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>
        Powered by AI Quiz System
      </el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import QuizHeader from './components/QuizHeader.vue'
</script>

<style scoped>
.quiz-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.el-main {
  flex: 1;
  padding: 20px;
}

.el-footer {
  text-align: center;
  padding: 20px;
}
</style>
