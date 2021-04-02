<template>
  <div class="v-theme-setting">
    <el-drawer
      title="主题配置"
      v-model="store.state.app.isShowThemeSetting"
      direction="rtl"
      :size="store.state.app.mode == 'pc' ? '500px' : '300px'"
    ></el-drawer>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useStore } from 'vuex';
  export default defineComponent({
    setup() {
      const store = useStore();
      return {
        store,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .v-theme-setting {
  }
</style>
