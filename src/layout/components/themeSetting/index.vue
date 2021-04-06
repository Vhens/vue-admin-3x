<template>
  <div class="v-theme-setting">
    <el-drawer
      title="主题配置"
      v-model="store.state.app.isShowThemeSetting"
      direction="rtl"
      :size="store.state.app.mode == 'pc' ? '500px' : '300px'"
    >
      <el-form
        ref="form"
        :label-position="store.state.app.mode == 'pc' ? 'right' : 'top'"
        label-width="100px"
        size="small"
      >
        <el-form-item v-if="store.state.app.mode == 'pc'" label="导航栏模式">
          <el-radio-group v-model="showHeader">
            <el-radio-button :label="true">顶部</el-radio-button>
            <el-radio-button :label="false">侧边</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useStore } from 'vuex';
  export default defineComponent({
    setup() {
      const store = useStore();
      const showHeader = computed({
        get: () => {
          return store.state.app.showHeader;
        },

        set: (val: any) => {
          console.log(val);
          return store.commit('app/updateThemeSetting', {
            showHeader: val,
          });
        },
      });
      return {
        store,
        showHeader,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .v-theme-setting {
  }
</style>
