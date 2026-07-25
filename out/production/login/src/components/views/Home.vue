<template>
  <div class="common-layout">
    <el-container>
      <el-header class="el-header">
        <div class="el-header-div1">
          <img class="book_logo" src="@/assets/book_logo.png" alt="Logo">
          <span>图书管理信息系统</span>
        </div>
        <el-dropdown>
          <span class="el-header-dropdown">管理员</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
              active-text-color="#ffd04b"
              background-color="#545c64"
              class="el-menu-vertical-demo"
              default-active="2"
              text-color="#fff"
              @open="handleOpen"
              @close="handleClose"
          >
            <!-- 首页 - 单独菜单项 -->
            <el-menu-item index="1" @click="navigateTo('home-page')">
              <el-icon><House /></el-icon>
              <span>首页</span>
            </el-menu-item>

            <!-- 图书管理 - 有子菜单 -->
            <el-sub-menu index="2">
              <template #title>
                <el-icon><Notebook /></el-icon>
                <span>图书管理</span>
              </template>
              <el-menu-item index="2-1" @click="navigateTo('book-list')">图书列表</el-menu-item>
              <el-menu-item index="2-2" @click="navigateTo('add-book')">添加新书</el-menu-item>
              <el-menu-item index="2-3" @click="navigateTo('book-category')">图书分类</el-menu-item>
              <el-menu-item index="2-4" @click="navigateTo('inventory-manage')">库存管理</el-menu-item>
            </el-sub-menu>
            <!-- 读者管理 - 有子菜单 -->
            <el-sub-menu index="3">
              <template #title>
                <el-icon><User /></el-icon>
                <span>读者管理</span>
              </template>
              <el-menu-item index="3-1">读者列表</el-menu-item>
              <el-menu-item index="3-2">读者注册</el-menu-item>
              <el-menu-item index="3-3">读者分组</el-menu-item>
              <el-menu-item index="3-4">借阅记录</el-menu-item>
            </el-sub-menu>

            <!-- 借阅管理 - 有子菜单 -->
            <el-sub-menu index="4">
              <template #title>
                <el-icon><Tickets /></el-icon>
                <span>借阅管理</span>
              </template>
              <el-menu-item index="4-1">借书登记</el-menu-item>
              <el-menu-item index="4-2">还书登记</el-menu-item>
              <el-menu-item index="4-3">续借管理</el-menu-item>
              <el-menu-item index="4-4">逾期管理</el-menu-item>
            </el-sub-menu>
            <!-- 系统设置 - 有子菜单 -->
            <el-sub-menu index="5">
              <template #title>
                <el-icon><Setting /></el-icon>
                <span>系统设置</span>
              </template>
              <el-menu-item index="5-1">用户管理</el-menu-item>
              <el-menu-item index="5-2">权限设置</el-menu-item>
              <el-menu-item index="5-3">系统参数</el-menu-item>
              <el-menu-item index="5-4">数据备份</el-menu-item>
            </el-sub-menu>

            <!-- 统计报表 - 单独菜单项 -->
            <el-menu-item index="6">
              <el-icon><DataLine /></el-icon>
              <span>统计报表</span>
            </el-menu-item>

            <!-- 帮助与反馈 - 单独菜单项 -->
            <el-menu-item index="7">
              <el-icon><QuestionFilled /></el-icon>
              <span>帮助与反馈</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
            <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>


import {
  DataLine,
  House,
  QuestionFilled,
  Setting,
} from "@element-plus/icons-vue";
import router from "@/router/router";
import { ElMessage } from "element-plus";

export default {
  name: `Home-vue`,
  components: {
    House,
    Setting,
    DataLine,
    QuestionFilled,
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log('menu open', key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log('menu close', key, keyPath);
    },
    navigateTo(routeName) {
      // 使用路径导航
      const routeMap = {
        'home-page':'/index',
        'book-list': '/index/book/list',
        'add-book': '/index/book/add',
        'book-category': '/index/book/category',
        'inventory-manage': '/index/book/inventory'
      };
      router.push(routeMap[routeName]);
    },
    handleLogout() {
      // 跳转到登录页
      router.push('/login');

      // 可选：显示退出成功消息
      ElMessage.success('您已成功退出登录');
    },

},

}
</script>

<style scoped>
    .common-layout {
      height: 100vh; /*容器高度设置为视口(Viewport)的100%（全屏高度）*/
      display: flex; /*启用弹性盒子(Flexbox)布局模型*/
    }
    .el-header {
        background-color: #545c64;  /* 设置背景颜色为深灰色 */
        color: white;              /* 设置文字颜色为白色 */
        display: flex;             /* 使用弹性盒子布局 */
        align-items: center;       /* 垂直居中对齐子元素 */
        justify-content: space-between; /* 子元素水平分散对齐，两端不留空间 */
}
    .el-aside {
      margin-top: 1px;
      background-color: #545c64; /* 确保aside背景色与菜单一致 */
      height: calc(100% - 1px);/* 填充父容器高度 */
      overflow-y: auto; /* 当内容超出时显示垂直滚动条 */
    }

    .el-menu {
      height: 100%; /* 菜单填充aside高度 */
      border-right: none; /* 移除默认边框 */
    }
    .book_logo{
      margin-left: 10px; /* 设置左外边距为 10 像素 */
      height: 60px;      /* 固定高度，宽度自动调整 */
      width: auto;       /* 保持图片宽高比例 */
      margin-right: 20px;
    }
    .el-header-div1{
      display: flex; /* 启用 Flex 弹性布局 */
      align-items: center; /* 垂直居中对齐子元素 */
    }
    .el-header-dropdown{
      color: white; /* 设置文字颜色为白色 */
      margin-right: 20px; /* 设置右外边距为 20 像素 */
    }
</style>