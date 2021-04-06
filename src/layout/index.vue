<template>
  <div class="v-layout">
    <div
      class="v-app-main"
      :style="{
        '--real-sidebar-width': realSidebarWidth,
      }"
    >
      <!-- 头部导航栏 -->
      <header
        class="v-app-header"
        v-if="store.state.app.mode == 'pc' && store.state.app.showHeader"
      >
        <div class="v-header-container">
          <div class="v-header-main">
            <!-- logo -->
            <v-logo></v-logo>
            <!-- 一级路由 -->
            <div v-if="store.state.menu.routes.length >= 1" class="v-nav">
              <template v-for="(item, index) in store.state.menu.routes">
                <div
                  v-if="item.children && item.children.length !== 0"
                  :key="index"
                  :class="{
                    item: true,
                    active: index == store.state.menu.navActiveIndex,
                  }"
                  @click="$store.commit('menu/switchNavActive', index)"
                >
                  <svg-icon v-if="item.meta.icon" :name="item.meta.icon" />
                  <span class="title" v-if="item.meta.title">{{ item.meta.title }}</span>
                </div>
              </template>
            </div>
          </div>
          <v-user-menu></v-user-menu>
        </div>
      </header>
      <!-- 主体内容 -->
      <div class="v-wrapper">
        <div
          class="v-sidebar-container"
          :class="{ show1: store.state.app.mode === 'mobile' && !store.state.app.sidebarCollapse }"
        >
          <div
            v-if="
              (!store.state.app.showHeader || store.state.app.mode == 'mobile') &&
                (store.state.menu.routes.length >= 1 || store.state.app.alwaysShowMainSidebar)
            "
            class="main-sidebar-container"
          >
            <v-logo :show-title="false" class="sidebar-logo" />
            <div class="v-nav">
              <template v-for="(item, index) in store.state.menu.routes">
                <div
                  v-if="item.children && item.children.length !== 0"
                  :key="index"
                  :class="{
                    item: true,
                    active: index == store.state.menu.navActiveIndex,
                  }"
                  :title="item.meta.title"
                  @click="store.commit('menu/switchNavActive', index)"
                >
                  <svg-icon v-if="item.meta.icon" :name="item.meta.icon" />
                  <span class="title">{{ item.meta.title }}</span>
                </div>
              </template>
            </div>
          </div>
          <!-- 侧边菜单栏 -->
          <div
            :class="{
              'v-sub-sidebar-container': true,
              'is-collapse': store.state.app.mode == 'pc' && store.state.app.sidebarCollapse,
            }"
            @scroll="onSidebarScroll"
          >
            <v-logo
              :show-logo="
                store.state.menu.routes.length <= 1 && !store.state.app.alwaysShowMainSidebar
              "
              :class="{
                'sidebar-logo': true,
                'sidebar-logo-bg':
                  store.state.menu.routes.length <= 1 && !store.state.app.alwaysShowMainSidebar,
                shadow: sidebarScrollTop,
              }"
            />
            <el-menu
              :background-color="styles.v_sub_sidebar_bg"
              :text-color="styles.v_sub_sidebar_menu_color"
              :active-text-color="styles.v_sub_sidebar_menu_active_color"
              unique-opened
              :default-active="routes.path"
              :collapse="store.state.app.mode === 'pc' && store.state.app.sidebarCollapse"
              :collapse-transition="false"
              :class="{
                'is-collapse-without-logo':
                  store.state.menu.routes.length > 1 &&
                  store.state.app.mode == 'pc' &&
                  store.state.app.sidebarCollapse,
              }"
            >
              <transition-group name="sidebar">
                <template v-for="route in store.getters['menu/sidebarRoutes']">
                  <v-sidebar-item
                    v-if="route.meta.sidebar !== false"
                    :key="route.path"
                    :item="route"
                    :base-path="route.path"
                  />
                </template>
              </transition-group>
            </el-menu>
          </div>
        </div>
        <div
          :class="{
            'v-sidebar-mask': true,
            show: store.state.app.mode == 'mobile' && !store.state.app.sidebarCollapse,
          }"
          @click="store.commit('app/toggleSidebarCollapse')"
        />
        <!-- 右侧主体内容区 -->
        <div class="v-main-container">
          <div class="view">
            <navbar :class="{ shadow: scrollTop }" />
            <router-view v-slot="{ Component }">
              <transition name="main" mode="out-in">
                <keep-alive v-if="isRouterAlive" :include="store.state.keepAlive.list">
                  <component :is="Component" />
                </keep-alive>
              </transition>
            </router-view>
          </div>
        </div>
      </div>
      <el-backtop :right="20" :bottom="20" title="回到顶部" />
    </div>
    <v-theme-setting></v-theme-setting>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    computed,
    toRefs,
    reactive,
    nextTick,
    provide,
    onMounted,
    onUnmounted,
  } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router';
  // @ts-ignore
  const variables: any = require('@/design/variables.scss');

  import vLogo from './components/logo/index.vue';
  import vUserMenu from './components/userMenu/index.vue';
  import vThemeSetting from './components/themeSetting/index.vue';
  import vSidebarItem from './components/sidebarItem/index.vue';
  import navbar from './components/navbar/index.vue';

  export default defineComponent({
    components: {
      vLogo,
      vUserMenu,
      vThemeSetting,
      vSidebarItem,
      navbar,
    },
    setup() {
      const store = useStore();
      const router = useRouter();
      const routes = useRoute();
      console.log(routes);
      const state = reactive({
        isRouterAlive: true,
        sidebarScrollTop: 0,
        scrollTop: 0,
      });
      // css变量
      const styles = computed(() => {
        return variables;
      });
      /**
       * 侧边栏宽度
       */
      const realSidebarWidth = computed(() => {
        let sidebarWidth = 0;
        if (store.state.app.mode == 'pc') {
          if (!store.state.app.showHeader) {
            sidebarWidth = parseInt(variables.v_main_sidebar_width);
          }
          if (store.state.app.sidebarCollapse) {
            sidebarWidth += 64;
          } else {
            sidebarWidth += parseInt(variables.v_sub_sidebar_width);
          }
        } else {
          sidebarWidth =
            parseInt(variables.v_main_sidebar_width) + parseInt(variables.v_sub_sidebar_width);
        }
        return `${sidebarWidth}px`;
      });
      /**
       * 重新加载页面
       */
      const reload = (type = 1) => {
        if (type == 1) {
          state.isRouterAlive = false;
          nextTick(() => {
            state.isRouterAlive = true;
          });
        } else {
          router.push({
            name: 'reload',
          });
        }
      };
      provide('reload', reload);

      const onSidebarScroll = (e: any) => {
        state.sidebarScrollTop = e.target.scrollTop;
      };
      const onScroll = () => {
        state.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      };
      onBeforeRouteUpdate(() => {
        reload();
      });
      onMounted(() => {
        window.addEventListener('scroll', onScroll);
      });
      onUnmounted(() => {
        window.removeEventListener('scroll', onScroll);
      });
      return {
        realSidebarWidth,
        ...toRefs(state),
        styles,
        reload,
        store,
        router,
        routes,
        onSidebarScroll,
        onScroll,
      };
    },
  });
</script>
<style lang="scss" scoped>
  [data-mode='mobile'] {
    .v-sidebar-container {
      transition: 0.3s;
      transform: translateX(calc(-1 * #{$v-sidebar-width}));
      &.show {
        transform: translateX(0);
      }
    }
    .v-main-container {
      margin-left: 0 !important;
    }
  }
  .v-layout {
    height: 100%;
    .v-app-main {
      width: 100%;
      height: 100%;
      margin: 0 auto;
      transition: all 0.2s;
    }
    .v-app-header {
      position: fixed;
      z-index: 1000;
      top: 0;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      padding: 0 20px;
      height: $v-header-height;
      background-color: $v-header-bg;
      color: $v-header-menu-color;
      .v-header-container {
        width: $v-header-width;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .v-header-main {
          display: flex;
          align-items: center;
        }
        .v-nav {
          display: flex;
          margin-left: 50px;
          .item {
            display: flex;
            align-items: center;
            padding: 10px;
            height: $v-header-height;
            // border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s;
            border-left: 2px solid $v-header-menu-active-bg;
            &.active,
            &:hover {
              background-color: $v-header-menu-active-bg;
            }
            .svg-icon {
              font-size: 20px;
            }
            .title {
              display: inline-block;
              margin-left: 15px;
            }
          }
        }
      }
      @media screen and (max-width: $v-header-width) {
        .v-header-container {
          width: 100%;
        }
      }
    }

    .v-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      .v-main-container {
        display: flex;
        flex-direction: column;
        min-height: 100%;
        margin-left: $v-sidebar-width;
        background-color: #f5f7f9;
        box-shadow: 1px 0 0 0 darken($v-main-bg, 10);
        transition: 0.3s;
      }
      .v-sidebar-mask {
        position: fixed;
        z-index: 1000;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba($color: #000, $alpha: 0.5);
        backdrop-filter: blur(2px);
        transition: all 0.2s;
        transform: translateZ(0);
        opacity: 0;
        visibility: hidden;
        &.show {
          opacity: 1;
          visibility: visible;
        }
      }
    }
    .v-app-header + .v-wrapper {
      padding-top: $v-header-height;
      .v-sidebar-container {
        top: $v-header-height;
        .sidebar-logo {
          display: none;
        }
        .el-menu {
          padding-top: 0;
        }
      }
      .v-main-container {
        .navbar {
          top: $v-header-height;
          ::v-deep .user {
            display: none;
          }
        }
      }
    }
    .main-sidebar-container {
      width: $v-main-sidebar-width;
      background-color: $v-main-sidebar-bg;
      color: #fff;
      .sidebar-logo {
        transition: 0.3s;
        background-color: $v-main-sidebar-bg;
      }
      .v-nav {
        width: 100%;
        // padding-top: $v-sidebar-logo-height;
        .item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
          height: 60px;
          padding: 0 5px;
          cursor: pointer;
          transition: 0.3s;
          &.active,
          &:hover {
            background-color: $v-main-sidebar-menu-active-bg;
          }
          .svg-icon {
            margin: 0 auto;
            font-size: 20px;
          }
          .title {
            text-align: center;
            font-size: 14px;
            padding: 4px;
            @include text-overflow;
          }
        }
      }
    }
    .v-main-container {
      display: flex;
      flex-direction: column;
      min-height: 100%;
      margin-left: $v-sidebar-width;
      background-color: #f5f7f9;
      box-shadow: 1px 0 0 0 darken($v-main-bg, 10);
      transition: 0.3s;
      .view {
        position: relative;
        min-height: 100%;
        flex: auto;
        padding: $v-topbar-height 0 0;
        overflow: hidden;
      }
    }
    .main-sidebar-container + .v-sub-sidebar-container {
      left: $v-main-sidebar-width;
    }
    .v-sidebar-container {
      position: fixed;
      z-index: 1020;
      top: 0;
      bottom: 0;
      display: flex;
      width: var(--real-sidebar-width);
      .main-sidebar-container,
      .v-sub-sidebar-container {
        transition: 0.3s;
        overflow-x: hidden;
        overflow-y: auto;
        overscroll-behavior: contain;
        // firefox隐藏滚动条
        scrollbar-width: none;
        // chrome隐藏滚动条
        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
    .v-sub-sidebar-container {
      width: $v-sub-sidebar-width;
      background-color: $v-sub-sidebar-bg;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      box-shadow: 10px 0 10px -10px darken($v-sub-sidebar-bg, 20);
      &.is-collapse {
        width: 64px;
        .sidebar-logo {
          &:not(.sidebar-logo-bg) {
            display: none;
          }
          ::v-deep span {
            display: none;
          }
        }
      }
      .sidebar-logo {
        background: $v-sub-sidebar-bg;
        border-bottom: 1px solid #e8e8e8;
        transition: box-shadow 0.2s, background-color 0.3s, color 0.3s;
        &:not(.sidebar-logo-bg) {
          ::v-deep span {
            color: $v-sub-sidebar-menu-color;
          }
        }
        &.sidebar-logo-bg {
          background: $v-main-sidebar-bg;
        }
        &.shadow {
          box-shadow: 0 10px 10px -10px darken($v-sub-sidebar-bg, 20);
        }
      }
      .el-menu {
        border-right: 0;
        // padding-top: $v-sidebar-logo-height;
        transition: border-color 0.3s, background-color 0.3s, color 0.3s;
        &:not(.el-menu--collapse) {
          width: inherit;
        }
        &.is-collapse-without-logo {
          padding-top: 0;
        }
        &.el-menu--collapse {
          ::v-deep .svg-icon {
            margin-right: 0;
          }
          ::v-deep .el-menu-item,
          ::v-deep .el-submenu__title {
            span {
              display: none;
            }
            i {
              right: 7px;
              margin-top: -5px;
            }
          }
        }
      }
    }

    // 侧边栏动画
    .sidebar-enter-active {
      transition: all 0.2s;
    }
    .sidebar-enter,
    .sidebar-leave-active {
      opacity: 0;
      transform: translateY(20px);
    }
    .sidebar-leave-active {
      position: absolute;
    }

    // 主内容区动画
    .main-enter-active {
      transition: all 0.2s;
    }
    .main-leave-active {
      transition: all 0.15s;
    }
    .main-enter {
      opacity: 0;
      margin-left: -20px;
    }
    .main-leave-to {
      opacity: 0;
      margin-left: 20px;
    }
  }
</style>
