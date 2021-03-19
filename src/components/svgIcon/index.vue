<!--
 * @Author: Vhen
 * @Date: 2021-03-03 10:07:35
 * @LastEditors: Vhen
 * @LastEditTime: 2021-03-16 15:07:41
 * @Description: 
-->
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
  export default {
    name: 'SvgIcon',
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
    data() {
      return {
        style: {},
      };
    },
    computed: {
      iconName() {
        return `#${this.name}`;
      },
      svgClass() {
        return ['icon-svg', `icon-svg-${this.name}`, this.className];
      },
    },
    mounted() {
      this.style = {
        fontSize: this.size,
      };
    },
  };
</script>

<style>
  .icon-svg {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
