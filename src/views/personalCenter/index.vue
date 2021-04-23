<template>
  <div class="personal-center">
    <v-page-header title="个人中心"></v-page-header>

    <el-row :gutter="24">
      <el-col :span="8" :xs="24">
        <el-card shadow="hover">
          <div class="user-info">
            <el-avatar :size="100" src="https://it.jzgylm.cn/lf.jpg"></el-avatar>
            <div class="user-name">vhen</div>
            <div class="sign">不忘初心，放得始终</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16" :xs="24">
        <el-card shadow="hover">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="first">基本信息</el-tab-pane>
            <el-tab-pane label="修改密码" name="second">修改密码</el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';
  export default defineComponent({
    setup() {
      /************************数据层*************************** */
      const state = reactive({
        activeName: 'first',
      });
      return {
        ...toRefs(state),
      };
    },
  });
</script>
<style lang="scss" scoped>
  .personal-center {
    .el-row {
      padding: 0 20px;
    }
    .user-info {
      text-align: center;
    }
    .user-name {
      font-size: 20px;
      font-weight: bold;
      margin-top: 20px;
    }
    .sign {
      font-size: 16px;
      color: #666;
      margin-top: 20px;
    }
  }
</style>
