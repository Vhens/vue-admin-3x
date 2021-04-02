<template>
  <div class="v-sidebar-item">
    <router-link
      v-if="!hasChildren"
      v-slot="{ href, navigate, isActive, isExactActive }"
      custom
      :to="resolvePath(item.path)"
    >
      <a
        :href="isExternal(resolvePath(item.path)) ? resolvePath(item.path) : href"
        :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']"
        :target="isExternal(resolvePath(item.path)) ? '_blank' : '_self'"
        @click="navigate"
      >
        <el-menu-item :title="item.meta.title" :index="resolvePath(item.path)">
          <svg-icon v-if="item.meta.icon" :name="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </el-menu-item>
      </a>
    </router-link>
    <el-submenu v-else :title="item.meta.title" :index="resolvePath(item.path)">
      <template #title>
        <svg-icon v-if="item.meta.icon" :name="item.meta.icon" />
        <span>{{ item.meta.title }}</span>
      </template>
      <SidebarItem
        v-for="route in item.children"
        :key="route.path"
        :item="route"
        :base-path="resolvePath(item.path)"
      />
    </el-submenu>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import path from 'path';
  import { isExternal } from '@/utils/tool';
  export default defineComponent({
    name: 'SidebarItem',
    props: {
      item: {
        type: Object,
        required: true,
      },
      basePath: {
        type: String,
        default: '',
      },
    },
    setup(props) {
      const hasChildren = computed(() => {
        let flag = true;
        if (props.item.children) {
          if (props.item.children.every((item: any) => item.meta.sidebar === false)) {
            flag = false;
          }
        } else {
          flag = false;
        }
        return flag;
      });
      const resolvePath = (routePath: string) => {
        if (isExternal(routePath)) {
          return routePath;
        }
        if (isExternal(props.basePath)) {
          return props.basePath;
        }
        return path.resolve(props.basePath, routePath);
      };
      return {
        hasChildren,
        isExternal,
        resolvePath,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .v-sidebar-item {
    width: 100%;
    ::v-deep .el-menu-item,
    ::v-deep .el-menu-item span,
    ::v-deep .el-submenu__title,
    ::v-deep .el-submenu__title span {
      vertical-align: inherit;
      @include text-overflow;
    }
    ::v-deep .el-submenu {
      .el-menu--inline {
        .el-submenu > .el-submenu__title,
        .el-menu-item {
          background-color: darken($v-sub-sidebar-bg, 7) !important;
          &:hover {
            background-color: darken($v-sub-sidebar-bg, 10) !important;
          }
        }
      }
    }
    ::v-deep .el-menu-item.is-active,
    ::v-deep .el-submenu .el-menu--inline .el-menu-item.is-active {
      background-color: $v-sub-sidebar-menu-active-bg !important;
    }
    ::v-deep .el-submenu,
    ::v-deep .el-menu-item {
      .svg-icon {
        font-size: 20px;
        margin-right: 10px;
        vertical-align: -0.25em;
        transition: all 0.3s;
      }
      &:hover > .svg-icon,
      .el-submenu__title:hover > .svg-icon {
        transform: scale(1.2);
      }
    }
    a {
      cursor: pointer;
      color: inherit;
      text-decoration: none;
    }
  }
</style>

<style lang="scss">
  .el-menu--collapse .el-submenu.is-active > .el-submenu__title {
    color: $v-sub-sidebar-menu-active-color !important;
    background-color: $v-sub-sidebar-menu-active-bg !important;
  }
</style>
