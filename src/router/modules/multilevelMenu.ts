/*
 * @Author: Vhen
 * @Date: 2021-04-01 14:06:24
 * @LastEditors: Vhen
 * @LastEditTime: 2021-04-02 11:39:44
 * @Description: 多级导航
 */
import Layout from '@/layout/index.vue';
import EmptyLayout from '@/layout/empty.vue';

export default {
  path: '/multilevel_menu',
  component: Layout,
  redirect: '/multilevel_menu/index',
  name: 'multilevelMenuExample',
  meta: {
    title: '多级导航',
    icon: 'sidebar-menu',
  },
  children: [
    {
      path: 'index',
      name: 'multilevelMenuExample1',
      component: () =>
        import(/* webpackChunkName: 'multilevel_menu' */ '@/views/multilevelMenu/level1/index.vue'),
      meta: {
        title: '导航1',
      },
    },
    {
      path: 'level2',
      name: 'level2',
      redirect: '/multilevel_menu/level2/index',
      component: EmptyLayout,
      meta: {
        title: '导航2',
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
            title: '导航2-1',
          },
        },
        {
          path: 'level3',
          name: 'multilevelMenuExample2-2',
          redirect: '/multilevel_menu/level2/level3/index',
          component: EmptyLayout,
          meta: {
            title: '导航2-2',
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
                title: '导航3-1',
              },
            },
          ],
        },
      ],
    },
  ],
};
