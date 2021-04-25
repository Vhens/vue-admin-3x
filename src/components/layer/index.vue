<template>
  <div class="layer" :class="{ 'layer-overlay': mask }" ref="elRef" v-if="showLayer">
    <div class="layer-container">
      <div class="layer-header">
        {{ title }}
      </div>
      <div class="layer-body">
        <div v-for="i of 100" :key="i">333333333333</div>
      </div>
      <div class="layer-footer">
        11111
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, watch, onMounted, reactive, toRefs } from 'vue';
  export default defineComponent({
    name: 'Layer',
    props: {
      modelValue: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
        default: '',
      },
      maximize: {
        type: Boolean,
        default: false,
      },
      fullscreen: {
        type: Boolean,
        default: false,
      },
      mask: {
        type: Boolean,
        default: true,
      },
    },
    emits: ['update:modelValue'],
    directives: {
      dialogDrag: {
        // @ts-ignore
        mounted(el: any, binding: any, vnode: any, oldVnode: any) {
          const layerHeaderEl = el.querySelector('.layer-header');
          const dragDom = el.querySelector('.layer-container');
          layerHeaderEl.style.cursor = 'move';

          const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);
          console.log(layerHeaderEl);
          layerHeaderEl.onmousedown = (e: any) => {
            // 判断当前是否为全屏状态
            // const path = e.path || (e.composedPath && e.composedPath());
            // console.log(path);
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - layerHeaderEl.offsetLeft;
            const disY = e.clientY - layerHeaderEl.offsetTop;
            console.log(disX);
          };
        },
      },
    },
    setup(props, context) {
      /*********************数据层***************************** */
      const state = reactive({
        showLayer: false,
      });
      /***********************函数层******************************** */
      const handlerOpenLayer = () => {
        state.showLayer = true;
      };
      const handlerCloseLayer = () => {
        state.showLayer = true;
      };
      const handerMoveLayer = (el: any) => {
        console.log(el);
        let wMax = document.documentElement.clientWidth - el.offsetWidth;
        let hMax = document.documentElement.clientHeight - el.offsetHeight;
      };
      onMounted(() => {
        if (props.modelValue) {
          handlerOpenLayer();
        }
      });
      /********************监听弹层************************ */
      watch(
        () => props.modelValue,
        (val: Boolean) => {
          if (val) {
            handlerOpenLayer();
          } else {
            handlerCloseLayer();
          }
        }
      );

      return {
        ...toRefs(state),
        handlerOpenLayer,
        handlerCloseLayer,
        handerMoveLayer,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .layer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2000;
    .layer-container {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      width: 300px;
      height: 300px;
      margin: 50px auto 0;
      background-color: #fff;
      border-radius: 4px;
      // box-shadow: 0 1px 3px rgb(0 0 0/30%);
      box-sizing: border-box;
    }
    .layer-header {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 40px;
      background-color: #e8e8e8;
      border-radius: 4px 4px 0 0;
    }
    .layer-body {
      flex: 1;
      overflow: auto;
    }
    .layer-footer {
      display: flex;
      align-items: center;
      width: 100%;
      min-height: 40px;
      border-radius: 0 0 4px 4px;
      background-color: #e8e8e8;
    }
  }
  .layer-overlay {
    background: rgba($color: #000000, $alpha: 0.5);
  }
</style>
