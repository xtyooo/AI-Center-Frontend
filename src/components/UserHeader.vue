<template>
  <el-menu class="el-menu-demo" mode="horizontal" :ellipsis="false">
    <el-menu-item>
      <img style="width: 55px" src="../assets/_001.svg" alt="Element logo" />
    </el-menu-item>
  </el-menu>

</template>

<script lang="ts" setup>



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
