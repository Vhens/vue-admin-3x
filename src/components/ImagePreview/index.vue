<template>
  <el-image
    :src="src"
    fit="cover"
    :style="`width:${realWidth};height:${realHeight};`"
    :preview-src-list="[src]"
  >
    <template #error>
      <div class="image-slot">
        <svg-icon name="image-load-fail" />
      </div>
    </template>
  </el-image>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  export default defineComponent({
    name: 'ImagePreview',
    props: {
      src: {
        type: String,
        required: true,
      },
      width: {
        type: [Number, String],
        default: '',
      },
      height: {
        type: [Number, String],
        default: '',
      },
    },
    setup(props) {
      /*****************************computed************************* */
      const realWidth = computed(() => {
        return typeof props.width == 'string' ? props.width : `${props.width}px`;
      });
      const realHeight = computed(() => {
        return typeof props.height == 'string' ? props.height : `${props.height}px`;
      });
      return {
        realWidth,
        realHeight,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .el-image {
    border-radius: 5px;
    background-color: #ebeef5;
    box-shadow: 0 0 5px 1px #ccc;
    ::v-deep .el-image__inner {
      transition: all 0.3s;
      cursor: pointer;
      &:hover {
        transform: scale(1.2);
      }
    }
    ::v-deep .image-slot {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      color: #909399;
      font-size: 30px;
    }
  }
</style>
