<template>
  <div class="page-content">
    <div v-if="title" class="title-container">{{ title }}</div>
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'PageContent',
    props: {
      title: {
        type: String,
        default: '',
      },
    },
  };
</script>
<style lang="scss" scoped>
  .page-content {
    position: relative;
    margin: 20px;
    padding: 20px;
    background-color: #fff;
    .title-container {
      width: calc(100% + 40px);
      padding: 14px 20px;
      margin-left: -20px;
      margin-top: -20px;
      margin-bottom: 20px;
      border-bottom: 1px solid #eee;
    }
  }
</style>
