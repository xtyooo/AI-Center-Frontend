<template>
  <el-table :data="filterTableData" style="width: 100%">
    <el-table-column label="用户Id" prop="id" />
    <el-table-column label="用户账号" prop="userAccount" />
    <el-table-column label="用户头像" prop="userAvatar">
      <template #default="scope">
        <el-image style="width: 100px; height: 80px; padding: 5px;" :src="scope.row.userAvatar" :zoom-rate="1.2"
          :max-scale="7" :min-scale="0.2" :preview-src-list="[scope.row.userAvatar]" :initial-index="4" fit="cover" />
      </template>
    </el-table-column>
    <el-table-column label="用户名" prop="userName" />

    <el-table-column label="用户简介" prop="userProfile" />
    <el-table-column label="用户角色" prop="userRole" />
    <el-table-column label="创建时间" prop="createTime">
      <template #default="scope">
        {{ dayjs(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') }}
      </template>
    </el-table-column>
    <el-table-column label="更新时间" prop="updateTime">
      <template #default="scope">
        {{ dayjs(scope.row.updateTime).format('YYYY-MM-DD HH:mm:ss') }}
      </template>
    </el-table-column>

    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="用户名搜索" />
      </template>
      <template #default="scope">
        <el-button size="big" @click="handleEdit(scope.$index, scope.row)">
          修改
        </el-button>


        <el-popconfirm confirm-button-text="Yes" cancel-button-text="No" :icon="InfoFilled" icon-color="#626AEF"
          title="你确定要删除这个吗？" @confirm="handleDelete(scope.$index, scope.row)" @cancel="cancelEvent">
          <template #reference>
            <el-button>删除</el-button>
          </template>
        </el-popconfirm>

      </template>
    </el-table-column>
  </el-table>





  <div class="example-pagination-block">
    <el-pagination v-model:current-page="currentPage" :page-size="pageSize" size="default" :disabled="disabled"
      background="true" layout="total, prev, pager, next" :total="total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>

</template>

<script lang="ts" setup>

import { deleteUserUsingPost, listUserByPageUsingPost } from '@/api/userController';

import { computed, onMounted, ref, watchEffect } from 'vue'
import { ElMessage } from 'element-plus'
import { InfoFilled } from '@element-plus/icons-vue'

import { dayjs } from "@arco-design/web-vue/es/_utils/date";


const search = ref('')
const filterTableData = computed(() =>
  tableData.value.filter(
    (data) =>
      !search.value ||
      data.userName?.toLowerCase().includes(search.value.toLowerCase())
  )
)
const handleEdit = (index: number, row: API.User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: API.User) => {
  console.log(row)
  deleteUserUsingPost({
    id: row.id,
  }).then((res) => {
    if (res.data.code === 0) {
      ElMessage({
        message: '删除成功',
        type: 'success',
      })
      loadTableData()
    } else {
      ElMessage({
        message: res.data.message,
        type: 'error',
      })
    }
  })




}
const cancelEvent = () => {
  console.log('cancel!')

}
const tableData = ref<API.User[]>([])

/**
 * 加载数据
 */
const loadTableData = async () => {
  const res = await listUserByPageUsingPost({
    current: currentPage.value,
    pageSize: pageSize.value,
  })
  if (res.data.code === 0) {
    tableData.value = res.data.data?.records || []
  } else {
    ElMessage({
      message: res.data.message,
      type: 'error',
    })
  }
}



// 分页
const currentPage = ref(1)
const pageSize = ref(2)
const disabled = ref(false)


const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}


const total = ref(10); // 总条数
/**
 * 加载总数
 */
const loadTotal = async () => {
  const res = await listUserByPageUsingPost({
    current: -1,
    pageSize: -1,
  })
  if (res.data.code === 0) {
    //records数组的长度
    total.value = res.data.data?.records?.length || 0
    console.log(total.value)
  } else {
    ElMessage({
      message: res.data.message,
      type: 'error',
    })
  }
}


onMounted(() => {
  loadTableData()
  loadTotal()
})





watchEffect(() => {
  loadTableData()
  loadTotal()
})


</script>

<style scoped>
.example-pagination-block+.example-pagination-block {
  margin-top: 10px;
}

.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}

/* 分页条底部居中 */
.example-pagination-block {
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
}
</style>
