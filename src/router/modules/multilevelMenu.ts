/*
 * @Author: Vhen
 * @Date: 2021-04-01 14:06:24
 * @LastEditors: Vhen
 * @LastEditTime: 2021-04-07 09:15:40
 * @Description: 多级菜单
 */
import Layout from '@/layout/index.vue';
import EmptyLayout from '@/layout/empty.vue';

export default {
  path: '/multilevel_menu',
  component: Layout,
  redirect: '/multilevel_menu/index',
  name: 'multilevelMenuExample',
  meta: {
    title: '多层级菜单',
    icon: 'menu',
  },
  children: [
    {
      path: 'index',
      name: 'multilevelMenuExample1',
      component: () =>
        import(/* webpackChunkName: 'multilevel_menu' */ '@/views/multilevelMenu/level1/index.vue'),
      meta: {
        title: '菜单1',
      },
    },
    {
      path: 'level2',
      name: 'level2',
      redirect: '/multilevel_menu/level2/index',
      component: EmptyLayout,
      meta: {
        title: '菜单2',
      },
      children: [
        {
          path: 'index',
          name: 'multilevelMenuExample2-1',
          component: () =>
            import(
              /* webpackChunkName: 'multilevel_menu' */ '@/views/multilevelMenu/level2/index.vue'
            ),
          meta: {
            title: '菜单2-1',
          },
        },
        {
          path: 'level3',
          name: 'multilevelMenuExample2-2',
          redirect: '/multilevel_menu/level2/level3/index',
          component: EmptyLayout,
          meta: {
            title: '菜单2-2',
          },
          children: [
            {
              path: 'index',
              name: 'multilevelMenuExample3-1',
              component: () =>
                import(
                  /* webpackChunkName: 'multilevel_menu' */ '@/views/multilevelMenu/level2/level3/index.vue'
                ),
              meta: {
                title: '菜单3-1',
              },
            },
          ],
        },
      ],
    },
  ],
};
