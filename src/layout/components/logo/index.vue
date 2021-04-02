<template>
  <div class="v-app-logo">
    <router-link v-slot="{ navigate }" :to="to">
      <div
        @click="navigate"
        :class="{
          'v-title': true,
          'v-is-link': enableDashboard,
        }"
      >
        <img v-if="showLogo" :src="logo" class="v-logo" />
        <span v-if="showTitle">{{ title }}</span>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
  import { defineComponent, toRefs, reactive, computed } from 'vue';
  import { useStore } from 'vuex';
  export default defineComponent({
    props: {
      showLogo: {
        type: Boolean,
        default: true,
      },
      showTitle: {
        type: Boolean,
        default: true,
      },
    },
    setup() {
      const store = useStore();

      const state = reactive({
        title: 'vhen',
        enableDashboard: store.state.app.enableDashboard,
        logo: 'https://it.jzgylm.cn/lf.jpg',
      });

      const to = computed(() => {
        const rtn: any = {};
        if (state.enableDashboard) {
          rtn.path = 'dashboard';
        }
        return rtn;
      });
      return {
        ...toRefs(state),
        to,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .v-app-logo {
    display: flex;
    align-items: center;
    height: $v-header-height;
    .v-title {
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: $v-sidebar-logo-height;
      text-align: center;
      overflow: hidden;
      text-decoration: none;
      &.v-is-link {
        cursor: pointer;
      }
      .v-logo {
        width: 50px;
        height: 50px;
        & + span {
          margin-left: 10px;
        }
      }
      span {
        display: block;
        font-weight: bold;
        color: #fff;
        @include text-overflow;
      }
    }
  }
</style>
