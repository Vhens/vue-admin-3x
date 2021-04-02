<template>
  <div class="v-user-menu">
    <div class="v-tools">
      <el-tooltip
        v-if="
          store.state.app.mode === 'pc' && isFullscreenEnable && store.state.app.enableFullscreen
        "
        effect="dark"
        content="全屏"
        placement="bottom"
      >
        <span class="item" @click="handleFullScreen">
          <svg-icon :name="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" />
        </span>
      </el-tooltip>
      <el-tooltip
        v-if="store.state.app.enablePageReload"
        effect="dark"
        content="刷新页面"
        placement="bottom"
      >
        <span class="item" @click="reload(2)">
          <svg-icon name="reload" />
        </span>
      </el-tooltip>
      <el-tooltip
        v-if="store.state.app.enableThemeSetting"
        effect="dark"
        content="主题配置"
        placement="bottom"
      >
        <span class="item" @click="store.commit('app/toggleThemeSetting')">
          <svg-icon name="theme" />
        </span>
      </el-tooltip>
    </div>
    <el-dropdown class="v-user-container" @command="handleCommand">
      <span class="el-dropdown-link v-user-wrapper">
        <el-avatar size="medium">
          <i class="el-icon-user-solid" />
        </el-avatar>
        vhen
        <i class="el-icon-caret-bottom" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="setting">个人设置</el-dropdown-item>
          <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
  import { defineComponent, toRefs, reactive, onMounted, onBeforeUnmount, inject } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import screenfull, { Screenfull } from 'screenfull';
  export default defineComponent({
    setup() {
      const store = useStore();
      const router = useRouter();
      const state = reactive({
        isFullscreen: false,
        isFullscreenEnable: screenfull.isEnabled,
      });
      const fullscreenChange = () => {
        state.isFullscreen = (screenfull as Screenfull).isFullscreen;
      };
      const handleFullScreen = () => {
        if (!screenfull.isEnabled) {
          // 如果不允许进入全屏，发出不允许提示
          return false;
        }
        screenfull.toggle();
      };
      const handleCommand = (command: string) => {
        console.log(command);
        switch (command) {
          case 'dashboard':
            router.push({
              path: 'dashboard',
            });
            break;
          case 'setting':
            router.push({
              path: 'personalSetting',
            });
            break;
          case 'logout':
            router.push({
              path: 'login',
            });
            break;
        }
      };
      const reload = inject('reload');
      onMounted(() => {
        if (screenfull.isEnabled) {
          screenfull.on('change', fullscreenChange);
        }
      });
      onBeforeUnmount(() => {
        if (screenfull.isEnabled) {
          screenfull.off('change', fullscreenChange);
        }
      });
      return {
        ...toRefs(state),
        fullscreenChange,
        handleFullScreen,
        reload,
        handleCommand,
        store,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .v-user-menu {
    display: flex;
    align-items: center;
    padding: 0 20px;
    white-space: nowrap;
    .v-tools {
      margin-right: 20px;
      .item {
        margin-left: 5px;
        padding: 6px 8px;
        border-radius: 5px;
        outline: none;
        cursor: pointer;
        transition: all 0.3s;
      }
    }
    .v-user-container {
      display: inline-block;
      height: 50px;
      line-height: 50px;
      cursor: pointer;
      .v-user-wrapper {
        color: #fff;
        .el-avatar {
          vertical-align: middle;
          margin-top: -2px;
          margin-right: 4px;
        }
      }
    }
  }
</style>
