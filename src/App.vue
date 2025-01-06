<template>
  <div>

    <template v-if="route.path.startsWith('/user')">
      <RouterView></RouterView>
    </template>

    <template v-else>
      <BasicLayout />
    </template>
  </div>
</template>

<script setup lang="ts">

import { onMounted } from 'vue';
import BasicLayout from './layouts/BasicLayout.vue';

import { useRoute } from 'vue-router';

const route = useRoute()

/**
 * 全局初始化函数，有全局单次调用的代码，都可以写到这里
 */
const doInit = () => {
  console.log("hello 欢迎来到我的项目");
};

onMounted(() => {
  doInit();
});



</script>





<style scoped></style>
