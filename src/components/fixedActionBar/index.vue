<template>
  <div
    class="fixed-action-bar "
    :class="{
      shadow: isShadow,
    }"
  >
    <slot />
  </div>
</template>

<script>
  import { defineComponent, onMounted, onUnmounted, reactive, toRefs } from 'vue';
  export default defineComponent({
    name: 'FixedActionBar',
    setup() {
      /*******************数据层**************************** */
      const state = reactive({
        isShadow: false,
      });
      /********************函数层*********************************** */
      const onScroll = () => {
        // 变量scrollTop是滚动条滚动时，滚动条上端距离顶部的距离
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        // 变量windowHeight是可视区的高度
        let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        // 变量scrollHeight是滚动条的总高度（当前可滚动的页面的总高度）
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        // 滚动条到底部
        if (Math.ceil(scrollTop + windowHeight) >= scrollHeight) {
          state.isShadow = true;
        } else {
          state.isShadow = false;
        }
      };
      onMounted(() => {
        onScroll();
        window.addEventListener('scroll', onScroll);
      });
      onUnmounted(() => {
        window.removeEventListener('scroll', onScroll);
      });
      return {
        ...toRefs(state),
      };
    },
  });
</script>
<style lang="scss" scoped>
  [data-mode='mobile'] {
    .fixed-action-bar {
      width: 100%;
      transform: translateX(-50%);
    }
  }
  .fixed-action-bar {
    position: fixed;
    z-index: 4;
    right: 0;
    bottom: 0;
    left: 50%;
    width: calc(100% - #{$v_sidebar_width});
    transform: translateX(calc(-50% + #{$v_sidebar_width} * 0.5));
    padding: 20px;
    text-align: center;
    background-color: #fff;
    transition: all 0.3s, box-shadow 0.5s;
    box-shadow: 0 0 1px 0 #ccc;
    &.shadow {
      box-shadow: 0 -10px 10px -10px #ccc;
    }
  }
  ::v-deep .el-form-item {
    margin-bottom: 0;
  }
</style>
