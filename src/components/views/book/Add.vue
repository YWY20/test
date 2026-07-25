<template>
  <div class="book-add-container">
    <h2>{{ isEditMode ? '编辑图书' : isEditMode ? '编辑图书' : '添加图书' }}</h2>

    <el-form ref="bookFormRef" :model="bookForm" :rules="bookRules"  :disabled="isViewMode">
      <!-- 基础信息 -->
      <el-form-item label="ISBN" prop="isbn">
        <el-input v-model="bookForm.isbn" placeholder="请输入ISBN号" />
      </el-form-item>

      <el-form-item label="书名" prop="title">
        <el-input v-model="bookForm.title" placeholder="请输入书名" />
      </el-form-item>

      <el-form-item label="作者" prop="author">
        <el-input v-model="bookForm.author" placeholder="请输入作者" />
      </el-form-item>

      <el-form-item label="出版社" prop="publisher">
        <el-input v-model="bookForm.publisher" placeholder="请输入出版社" />
      </el-form-item>

      <el-form-item label="出版日期" prop="publishDate">
        <el-date-picker
            v-model="bookForm.publishDate"
            type="date"
            placeholder="选择出版日期"
            style="width: 100%"
        />
      </el-form-item>

      <el-form-item label="分类" prop="categoryId">
        <el-select
            v-model="bookForm.categoryId"
            placeholder="请选择分类"
            style="width: 100%"
        >
          <el-option label="古典文学" :value="1" />
          <el-option label="外国文学" :value="2" />
          <el-option label="现当代文学" :value="3" />
          <el-option label="科幻小说" :value="4" />
          <el-option label="儿童文学" :value="5" />
        </el-select>
      </el-form-item>

      <el-form-item label="价格" prop="price">
        <el-input-number v-model="bookForm.price" :precision="2" :min="0" />
      </el-form-item>

      <el-form-item label="页数" prop="pageCount">
        <el-input-number
            v-model="bookForm.pageCount"
            :min="1"
            controls-position="right"
        />
      </el-form-item>

      <el-form-item label="语种" prop="language">
        <el-select
            v-model="bookForm.language"
            placeholder="请选择语种"
            style="width: 100%"
        >
          <el-option label="中文" value="中文" />
          <el-option label="英文" value="英文" />
          <el-option label="其他" value="其他" />
        </el-select>
      </el-form-item>

      <el-form-item label="版本" prop="edition">
        <el-input v-model="bookForm.edition" placeholder="请输入版本号" />
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="bookForm.status">
          <el-radio :label="0">下架</el-radio>
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">缺货</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="图书描述" prop="description">
        <el-input
            v-model="bookForm.description"
            type="textarea"
            :rows="4"
            placeholder="请输入图书描述"
        />
      </el-form-item>

      <el-form-item v-if="!isViewMode">
        <el-button type="primary" @click="submitForm">
          {{ isEditMode ? '更新' : '提交' }}
        </el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>

    </el-form>

    <!-- 查看模式下显示返回按钮 -->
    <div v-if="isViewMode" class="action-buttons">
      <el-button @click="$router.go(-1)">返回</el-button>
    </div>

  </div>
</template>

<script>
import api_system from "@/router";
import {ElMessage} from "element-plus";

export default {
  name: 'BookAdd',
  props: {
    id: String, // 接收路由参数
    mode: {    // 接收模式参数(view/edit/add)
      type: String,
      default: 'add'
    }
  },
  computed: {
    isViewMode() {
      return this.$route.query.mode === 'view';
    },
    isEditMode() {
      return this.$route.query.mode === 'edit';
    }
  },
  methods: {
    async fetchBookDetail(id) {
      try {
        const res = await api_system.get(`/book/detail/${id}`);
        this.bookForm = {
          ...res.data,
          publishDate: res.data.publishDate ? new Date(res.data.publishDate) : ''
        };
        if (this.isViewMode) {
          this.$nextTick(() => {
            if (this.$refs.bookFormRef) {
              this.$refs.bookFormRef.disabled = true;
            }
          });
        }
      } catch (error) {
        ElMessage.error('获取图书详情失败');
      }
    },

    // 补充 async，适配内部 await
    submitForm(){
      this.$refs.bookFormRef.validate(async (valid) => {
        if (valid) {
          try {
            const formData = {
              ...this.bookForm,
              publishDate: this.bookForm.publishDate.toISOString().split('T')[0],
              edition: parseInt(this.bookForm.edition || 0)
            };

            let res;
            if (this.isEditMode) {
              res = await api_system.put(`/book/update/${this.id}`, formData);
            } else {
              res = await api_system.post('/book/add', formData);
            }

            if (res.code === 200) {
              ElMessage.success(this.isEditMode ? '更新成功' : '添加成功');
            } else {
              ElMessage.error(res.message || '操作失败');
            }
          } catch (error){
            // ========== 关键：看这里 ==========
            console.error("【真正错误】", error);
            console.error("【错误详情】", error.response);
            ElMessage.error('操作失败');
          }
        } else {
          console.log('表单验证失败')
          return false
        }
      })
    },
    resetForm(){
      this.$refs.bookFormRef.resetFields()
    },
  },
  data() {
    return {
      //isEditMode:false
      bookFormRef: null,
      bookRules: {
        isbn: [
          { required: true, message: '请输入ISBN号', trigger: 'blur' },
          { pattern: /^[0-9-]{10,20}$/, message: 'ISBN格式不正确', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入书名', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在1到100个字符', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '请输入作者', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在1到50个字符', trigger: 'blur' }
        ],
        publisher: [
          { required: true, message: '请输入出版社', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在1到100个字符', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' },
          { type: 'number', min: 0, message: '价格不能为负数', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        publishDate: [
          { required: true, message: '请选择出版日期', trigger: 'change' }
        ],
        categoryId: [
          { required: true, message: '请选择分类', trigger: 'change' }
        ],
        pageCount: [
          { type: 'number', min: 1, message: '页数必须大于0', trigger: 'blur' }
        ],
        language: [
          { required: true, message: '请选择语种', trigger: 'change' }
        ],
        edition: [
          { required: true, message: '请输入版本号', trigger: 'blur' }
        ]
      },
      bookForm: {
        isbn: '',
        title: '',
        author: '',
        publisher: '',
        price: 0,
        status: 1,
        publishDate: '',
        categoryId: null,
        description: '',
        pageCount: 0,
        language: '中文',
        edition: '',
      },
    }
  },
  async created() {
    console.log('Received mode:', this.mode); // 检查实际接收到的mode值
    console.log('Route query:', this.$route.query); // 检查路由查询参数

    if (this.id) {
      await this.fetchBookDetail(this.id);
    }
  }
}
</script>

<style scoped>
    .book-add-container {
        padding: 20px;
        margin: 0 auto;
    }
    .el-form-item {
        width: 400px;
    }
    .action-buttons {
      margin-top: 20px;
    }
</style>
