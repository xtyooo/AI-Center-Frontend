<!-- src/components/AppCard.vue -->
<template>
  <el-card class="app-card" :body-style="{ padding: '0px' }" shadow="hover" @click="handleClick">
    <div class="app-icon">
      <el-image :src="app.icon" fit="cover" />
    </div>
    <div class="app-content">
      <h3>{{ app.name }}</h3>
      <p class="description">{{ app.description }}</p>
      <div class="features">
        <el-tag v-for="feature in app.features" :key="feature" size="small" class="feature-tag">
          {{ feature }}
        </el-tag>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'AppCard',
  props: {
    app: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
.app-card {
  height: 100%;
  cursor: pointer;
  transition: transform 0.3s;
}

.app-card:hover {
  transform: translateY(-5px);
}

.app-icon {
  height: 160px;
  overflow: hidden;
}

.app-icon .el-image {
  width: 100%;
  height: 100%;
}

.app-content {
  padding: 16px;
}

.app-content h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  color: #303133;
}

.description {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #606266;
  line-height: 1.4;
}

.features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.feature-tag {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
