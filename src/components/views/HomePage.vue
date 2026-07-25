<template>
  <!-- 首页内容开始 -->
  <div class="home-container">
    <!-- 欢迎卡片 -->
    <el-card class="welcome-card">
      <div class="welcome-content">
        <h1>欢迎使用图书管理信息系统</h1>
        <p>高效管理图书馆资源，提升读者服务体验</p>
        <el-button type="primary" size="large">快速开始</el-button>
      </div>
    </el-card>

    <!-- 数据概览 -->
    <div class="data-overview">
      <h2 class="section-title">数据概览</h2>
      <el-row :gutter="20">
        <!-- 四个数据卡片 -->
        <!-- 第一个数据卡片 -->
        <el-col :span="6">
          <el-card shadow="hover" class="data-card">
            <div class="data-item">
              <el-icon class="data-icon"><Notebook /></el-icon>
              <div class="data-text">
                <div class="data-value">5,248</div>
                <div class="data-label">馆藏图书</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <!-- 第二个数据卡片 -->
        <el-col :span="6">
          <el-card shadow="hover" class="data-card">
            <div class="data-item">
              <el-icon class="data-icon"><User /></el-icon>
              <div class="data-text">
                <div class="data-value">1,326</div>
                <div class="data-label">注册读者</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <!-- 第三个数据卡片 -->
        <el-col :span="6">
          <el-card shadow="hover" class="data-card">
            <div class="data-item">
              <el-icon class="data-icon"><Tickets /></el-icon>
              <div class="data-text">
                <div class="data-value">328</div>
                <div class="data-label">今日借阅</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <!-- 第四个数据卡片 -->
        <el-col :span="6">
          <el-card shadow="hover" class="data-card">
            <div class="data-item">
              <el-icon class="data-icon"><Clock /></el-icon>
              <div class="data-text">
                <div class="data-value">47</div>
                <div class="data-label">即将逾期</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 快捷操作 -->
    <div class="quick-actions">
      <h2 class="section-title">快捷操作</h2>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card shadow="hover" class="action-card" @click="navigateTo('2-2')">
            <el-icon class="action-icon"><Plus /></el-icon>
            <div class="action-text">添加新书</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" class="action-card" @click="navigateTo('3-2')">
            <el-icon class="action-icon"><CirclePlus /></el-icon>
            <div class="action-text">读者注册</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" class="action-card" @click="navigateTo('4-1')">
            <el-icon class="action-icon"><Reading /></el-icon>
            <div class="action-text">借书登记</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" class="action-card" @click="navigateTo('4-2')">
            <el-icon class="action-icon"><Back /></el-icon>
            <div class="action-text">还书登记</div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
  <!-- 借阅统计图表 -->
  <div class="statistics-chart">
    <h2 class="section-title">借阅统计</h2>
    <el-card>
      <div id="borrowChart" style="height: 300px;"></div>
    </el-card>
  </div>
  <!-- 最新动态 -->
  <div class="recent-activities">
    <h2 class="section-title">最新动态</h2>
    <el-card>
      <el-timeline>
        <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :timestamp="activity.timestamp"
            :color="activity.color"
            placement="top"
        >
          <el-card>
            <h4>{{ activity.title }}</h4>
            <p>{{ activity.content }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script>
    import {
    Notebook,
    User,
    Tickets,
    Clock,
    Plus,
    CirclePlus,
    Reading,
    Back
  } from '@element-plus/icons-vue'
  import * as echarts from 'echarts'
  export default {
    name:"HomePage",
    components: {
      Notebook,
      User,
      Tickets,
      Clock,
      Plus,
      CirclePlus,
      Reading,
      Back
    },
    data() {
      return {
        activities: [
          {
            title: '系统更新',
            content: '图书管理系统已升级至v2.5.0版本，新增了数据导出功能。',
            timestamp: '2023-05-15',
            color: '#0bbd87'
          },
          {
            title: '新书入库',
            content: '新增计算机科学类图书50册，文学类图书30册。',
            timestamp: '2023-05-10',
            color: '#e54d42'
          },
          {
            title: '读者活动',
            content: '成功举办"书香校园"读书月活动，参与读者达200人。',
            timestamp: '2023-05-05',
            color: '#1f8dd6'
          },
          {
            title: '系统维护',
            content: '已完成数据库备份和系统优化工作。',
            timestamp: '2023-04-28',
            color: '#fbbd08'
          }
        ]
      }
    },
    methods: {
    navigateTo(index) {
      // 这里实现导航逻辑
      console.log('Navigate to:', index);
    },
    initChart()
    {
      const chartDom = document.getElementById('borrowChart');
      const myChart = echarts.init(chartDom);

      const option = {
        tooltip: {                  // 提示框配置
          trigger: 'axis',          // 触发方式：坐标轴触发
          axisPointer: {            // 坐标轴指示器
            type: 'shadow'          // 阴影指示器（适合柱状图）
          }
        },
        legend: {                   // 图例配置
          top: 0,
          left: 'center',
          data: ['借阅量', '归还量'] // 手动指定图例项（需与series.name对应）
        },
        grid: {                     // 图表布局
          left: '3%',               // 左边距
          right: '4%',              // 右边距
          bottom: '3%',             // 底部边距
          containLabel: true        // 包含坐标轴标签
        },
        xAxis: {                    // X轴配置
          type: 'category',         // 类目轴
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'] // 手动指定类目
        },
        yAxis: {type: 'value'},   // Y轴（数值轴）
        series: [                   // 系列列表
          {
            name: '借阅量',         // 系列名称（与legend.data对应）
            type: 'bar',            // 柱状图
            data: [320, 332, 301, 334, 390, 330, 320], // 手动绑定数据
            itemStyle: {            // 样式配置
              color: '#409EFF'      // 柱条颜色（ElementUI主色）
            }
          },
          {
            name: '归还量',
            type: 'bar',
            data: [300, 310, 290, 320, 380, 310, 300],
            itemStyle: {
              color: '#67C23A'      // 柱条颜色（ElementUI成功色）
            }
          }
        ]
      };
      myChart.setOption(option);

      // 响应式调整
      window.addEventListener('resize', function () {
        myChart.resize();
      });
  },
    mounted() {
      this.initChart();
    }
    }
    }
</script>

<style scoped>

</style>