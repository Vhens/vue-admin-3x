<template>
  <div class="test">
    <v-page-header>
      <template #content>
        <p>test</p>
        <p style="margin-bottom: 0;">测试标题描述</p>
      </template>
    </v-page-header>
    <v-page-content title="搜索条件">
      <v-search-bar show-more @toggle="show = $event">
        <el-form ref="form" :model="form" inline label-width="80px">
          <el-form-item label="活动名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.date1"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker
                placeholder="选择时间"
                v-model="form.date2"
                style="width: 100%;"
              ></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="即时配送">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="活动性质">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="地推活动" name="type"></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="特殊资源">
            <el-radio-group v-model="form.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </v-search-bar>
    </v-page-content>
    <v-page-content title="处理结果">
      <el-row :gutter="24">
        <el-col :span="12">
          <v-result type="success" title="提交成功" desc="提交成功,请核对信息">
            <el-button type="primary" size="small">返回列表</el-button>
          </v-result>
        </el-col>
        <el-col :span="12">
          <v-result
            type="error"
            title="提交失败"
            desc="提交失败。请核对并修改以下信息后，再重新提交。"
          >
            <template #extra>
              <div>您提交的内容有如下错误：提交参数不对</div>
            </template>
            <el-button type="primary" size="small">返回修改</el-button>
          </v-result>
        </el-col>
      </el-row>
    </v-page-content>
    <v-page-content title="单张图片上传">
      <v-image-upload
        :url="image"
        action="https://jsonplaceholder.typicode.com/posts/"
        name="image"
        :width="250"
        :height="150"
        :data="{ token: '5454564654564646564' }"
        @onSuccess="handleSuccess"
      />
    </v-page-content>
    <v-page-content title="图片预览">
      <v-image-preview src="https://it.jzgylm.cn/lf.jpg" :width="200" />
      <v-image-preview src="https://it.jzgylm.cn/lf1.jpg" width="100px" height="100px" />
    </v-page-content>
    <v-page-content title="测试3"></v-page-content>

    <v-fixed-action-bar>
      <el-button type="primary">立即创建</el-button>
      <el-button>取消</el-button>
    </v-fixed-action-bar>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';

  export default defineComponent({
    setup() {
      /********************基础数据层************************** */
      const state = reactive({
        show: true,
        image: '',
      });

      const form = reactive({
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: true,
        type: [],
        resource: '',
        desc: '',
      });
      /**********************************函数层*************************** */
      const handleSuccess = () => {};
      return {
        state,
        form,
        handleSuccess,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .test {
    padding-bottom: 100px;
  }
</style>
