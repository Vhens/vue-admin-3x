<template>
  <div class="search-bar">
    <slot />
    <div v-if="showMore" class="more">
      <el-button
        type="text"
        size="small"
        :icon="isOpen ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"
        @click="toggle"
        >{{ isOpen ? '收起' : '展开' }}</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';

  export default defineComponent({
    name: 'SearchBar',
    props: {
      showMore: {
        type: Boolean,
        default: false,
      },
    },
    setup(props: any, context) {
      const state = reactive({
        isOpen: false,
      });
      const toggle = () => {
        state.isOpen = !state.isOpen;
        context.emit('toggle', state.isOpen);
      };
      return {
        ...toRefs(state),
        toggle,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .search-bar {
    position: relative;
    margin: 20px 0;
    padding: 20px;
    background-color: #f7f8fa;
    &:first-child {
      margin-top: 0;
    }
    ::v-deep .el-form {
      margin-bottom: -18px;
      .el-select {
        width: 100%;
      }
      .el-date-editor {
        width: 100%;
      }
    }
    .more {
      text-align: center;
    }
  }
</style>
