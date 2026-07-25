<template>
  <div class="book-list-container">
    <!-- 简单的标题和添加按钮 -->
    <div class="list-header">
      <h2>图书列表</h2>
      <el-button type="primary" @click="navigateTo('add-book')">
        <el-icon>
          <Plus/>
        </el-icon>
        添加图书
      </el-button>
    </div>

    <!-- 图书列表表格 -->
    <el-table :data="bookList" style="width: 100%" class="custom-table">
      <!-- ID列 -->
      <el-table-column prop="id" label="ID" width="80" align="center"/>

      <!-- 书名列 -->
      <el-table-column prop="title" label="书名" width="180"/>

      <!-- 作者列 -->
      <el-table-column prop="author" label="作者" width="120"/>

      <!-- 出版社列 -->
      <el-table-column prop="publisher" label="出版社" width="150"/>

      <!-- 价格列 -->
      <el-table-column label="价格" min-width="100" align="right">
        <template #default="scope">
          ¥{{ scope.row.price?.toFixed(2) || '0.00' }}
        </template>
      </el-table-column>

      <!-- 状态列 -->
      <el-table-column label="状态" width="100" align="center">
        <template #default="scope">
          <el-tag
              :type="scope.row.status === 1 ? 'success' : scope.row.status === 2 ? 'warning' : 'info'"
              size="small"
          >
            {{ scope.row.status === 1 ? '正常' : scope.row.status === 2 ? '缺货' : '下架' }}
          </el-tag>
        </template>
      </el-table-column>

      <!-- 操作列 -->
      <el-table-column label="操作" width="220" align="center" fixed="right">
        <template #default="scope">
          <el-button
              size="small"
              type="primary"
              @click.stop="handleQuery(scope.row)"
          >
            查询
          </el-button>
          <el-button
              size="small"
              @click.stop="handleEdit(scope.row)"
          >
            编辑
          </el-button>
          <el-button
              size="small"
              type="danger"
              @click.stop="handleDelete(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <div class="pagination-container">
      <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 50]"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import {ElMessage, ElMessageBox} from 'element-plus'
import {Plus} from '@element-plus/icons-vue'
import router from "@/router/router";
import api_system from '@/router/index'

export default {
  name: "BookList",
  components: {Plus},
    data() {
      return {
        bookList: [],
        // 新增分页相关数据
        currentPage: 1, // 当前页码
        pageSize: 10,   // 每页条数
        total: 0        // 总数据量
      }
    },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    // 每页条数变化回调
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchBooks()
    },

// 页码变化回调
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchBooks()
    },
    // 获取图书列表
    async fetchBooks() {
      try {
        const params = { // 新增分页参数
          page: this.currentPage,
          size: this.pageSize
        };
        const res = await api_system.get('/book/list', { params })
        this.bookList = res.data || [] // 假设返回数据结构为 { list: [], total: 100 }
        this.total = res.total || 0    // 接收总条数
      } catch (error) {
        console.error('获取图书列表失败: ', error)
        ElMessage.error('获取图书列表失败: ' + (error.response?.data?.message || error.message))
      }
    },
    navigateTo(routeName) {
      router.push({name: routeName});
    },

    handleQuery(row) {
      // console.log('查询图书:', row.id)

      // 跳转到详情页，传递图书ID
      router.push({
        name: 'book-detail',
        params: { id: row.id },
        query: { mode: 'view' } // mode作为查询参数
      })
    },

    handleEdit(row) {
      // console.log('编辑图书:', row.id)
      // 跳转到详情页，传递图书ID
      this.$router.push({
        name: 'book-edit',
        params: { id: row.id },
        query: { mode: 'edit' } // mode作为查询参数
      })
    },

    handleDelete(row) {
      ElMessageBox.confirm('确定要删除这本图书吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 这里调用删除API
        console.log('删除图书:', row.id)
        ElMessage.success('删除成功')
      }).catch(() => {
        ElMessage.info('已取消删除')
      })
    }

  },
}
</script>

<style scoped>
.book-list-container {
  display: flex;           /* 启用flex布局 */
  flex-direction: column;  /* 垂直排列子元素 */
  min-height: 100%;        /* 撑满父容器高度 */
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

/* 分页容器样式 */
.pagination-container {
  margin-top: 20px;              /* 与表格的间距 */
  display: flex;
  justify-content: flex-end;    /* 分页右对齐 */

  /* 可选：固定分页组件在底部 */
  position: sticky;
  bottom: 20px;
  background: white;
  padding: 10px 0;
  z-index: 10;
}
</style>

