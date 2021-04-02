<template>
  <div></div>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  export default defineComponent({
    setup() {
      const router = useRouter();
      onMounted(() => {
        router.go(-1);
      });
    },
  });
</script>
