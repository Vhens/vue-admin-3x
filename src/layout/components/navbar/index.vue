<template>
  <div class="navbar">
    <div class="left-box">
      <div
        v-if="store.state.app.mode == 'mobile' || store.state.app.enableSidebarCollapse"
        :class="{
          'sidebar-collapse': true,
          'is-collapse': store.state.app.sidebarCollapse,
        }"
        @click="store.commit('app/toggleSidebarCollapse')"
      >
        <svg-icon name="collapse" />
      </div>
      <el-breadcrumb v-if="store.state.app.mode == 'pc'" separator-class="el-icon-arrow-right">
        <transition-group name="breadcrumb">
          <el-breadcrumb-item
            v-for="item in breadcrumbList"
            :key="item.path"
            :to="pathCompile(item.path)"
            >{{ item.title }}</el-breadcrumb-item
          >
        </transition-group>
      </el-breadcrumb>
    </div>
    <UserMenu v-if="!store.state.app.showHeader" />
  </div>
</template>

<script lang="ts">
  import { compile } from 'path-to-regexp';
  import { defineComponent, computed } from 'vue';
  import { useStore } from 'vuex';
  import { deepClone } from '@/utils/tool';
  import { useRouter, useRoute } from 'vue-router';
  import UserMenu from '../userMenu/index.vue';
  export default defineComponent({
    components: {
      UserMenu,
    },
    setup() {
      const store = useStore();
      const route = useRoute();
      const router = useRouter();
      const breadcrumbList = computed(() => {
        const breadcrumbList: any = [];
        if (store.state.app.enableDashboard) {
          breadcrumbList.push({
            path: '/dashboard',
            title: store.state.app.dashboardTitle,
          });
        }
        if (store.state.app.enableFlatRoutes) {
          console.log('sss', route.meta);
          // if (route.meta.breadcrumbNeste) {
          //   route.meta.breadcrumbNeste.map((item, index) => {
          //     let tmpItem = deepClone(item);
          //     if (index != 0) {
          //       tmpItem.path = `${route.meta.breadcrumbNeste[0].path}/${item.path}`;
          //     }
          //     breadcrumbList.push(tmpItem);
          //   });
          // }
        } else {
          route.matched.map((item) => {
            if (
              item.meta &&
              item.meta.title &&
              item.meta.breadcrumb !== false &&
              item.path != '/dashboard'
            ) {
              breadcrumbList.push({
                path: item.path,
                title: item.meta.title,
              });
            }
          });
        }
        return breadcrumbList;
      });
      const pathCompile = (path: string) => {
        const toPath: any = compile(path);
        return toPath(route.params);
      };
      return {
        store,
        breadcrumbList,
        pathCompile,
      };
    },
  });
</script>
<style lang="scss" scoped>
  [data-mode='mobile'] {
    .navbar {
      width: 100%;
      transform: translateX(-50%);
    }
  }
  .navbar {
    position: fixed;
    z-index: 999;
    top: 0;
    right: 0;
    left: 50%;
    width: calc(100% - #{$v_sidebar_width});
    transform: translateX(calc(-50% + #{$v_sidebar_width} * 0.5));
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: $v-topbar-height;
    background-color: #fff;
    transition: 0.3s, box-shadow 0.2s;
    box-shadow: 0 0 1px 0 #ccc;
    &.shadow {
      box-shadow: 0 10px 10px -10px #ccc;
    }
    .left-box {
      display: flex;
      align-items: center;
      padding-right: 50px;
      overflow: hidden;
      mask-image: linear-gradient(90deg, #000 0%, #000 calc(100% - 50px), transparent);
      .sidebar-collapse {
        display: flex;
        align-items: center;
        padding: 0 20px;
        height: 50px;
        cursor: pointer;
        transition: 0.3s;
        &:hover {
          background-image: linear-gradient(to right, #ddd, transparent);
        }
        .svg-icon {
          transition: 0.3s;
        }
        &.is-collapse .svg-icon {
          transform: rotateZ(-180deg);
        }
        & + .el-breadcrumb {
          margin-left: 0;
        }
      }
      ::v-deep .el-breadcrumb {
        margin-left: 20px;
        white-space: nowrap;
        .el-breadcrumb__item {
          display: inline-block;
          float: none;
          span {
            font-weight: normal;
          }
          &:last-child span {
            color: #97a8be;
          }
        }
      }
    }
    ::v-deep .v-user-wrapper {
      color: #666 !important;
    }
  }

  // 面包屑动画
  .breadcrumb-enter-active {
    transition: all 0.25s;
  }
  .breadcrumb-enter,
  .breadcrumb-leave-active {
    opacity: 0;
    transform: translateX(30px) skewX(-50deg);
  }
</style>
