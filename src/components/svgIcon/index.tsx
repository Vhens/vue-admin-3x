/*
 * @Author: Vhen
 * @Date: 2021-03-03 09:50:15
 * @LastEditors: Vhen
 * @LastEditTime: 2021-03-16 15:06:56
 * @Description:
 */

import { defineComponent, computed, reactive, onMounted } from 'vue';
import './index.scss';
export default defineComponent({
  name: 'svg-icon',
  props: {
    name: {
      type: String,
    },
    className: {
      type: String,
    },
    size: {
      type: String,
    },
  },

  inheritAttrs: false,
  setup(props, { attrs }) {
    const iconName = computed(() => `#${props.name}`);
    const svgClass = computed(() => {
      return ['icon-svg', `icon-svg__${props.name}`, props.className];
    });
    let style = reactive({});

    onMounted(() => {
      style = {
        fontSize: props.size || 14,
      };
      console.log(style, 'style');
    });

    return () => {
      return (
        <>
          <svg class={svgClass.value} style={style} aria-hidden="true">
            <use xlink-href={iconName.value}></use>
          </svg>
        </>
      );
    };
  },
});
