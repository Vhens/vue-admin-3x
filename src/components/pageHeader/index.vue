<template>
  <div class="page-header">
    <div>
      <div class="title">{{ title }}</div>
      <div class="content">
        <slot name="content">{{ content }}</slot>
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'PageHeader',
    props: {
      title: {
        type: String,
        required: true,
        default: '页面标题头',
      },
      content: {
        type: String,
        default: '',
      },
    },
  };
</script>
<style lang="scss" scoped>
  .page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 16px 20px;
    background: #fff;
    border-bottom: 1px solid #e8eaec;
    .title {
      font-size: 16px;
      font-weight: bold;
    }
    .content {
      color: #909399;
      font-size: 14px;
      margin-top: 10px;
      &:empty {
        display: none;
      }
    }
  }
</style>
