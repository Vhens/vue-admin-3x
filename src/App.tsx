/*
 * @Author: Vhen
 * @Date: 2021-03-02 15:56:43
 * @LastEditors: Vhen
 * @LastEditTime: 2021-04-02 15:17:22
 * @Description:   api-announcement/imgConfigure/getImgConfigureList  api-auction-server/auction/hall/list
 */
import { defineComponent, ref, getCurrentInstance, onMounted, watch } from 'vue';
// import { useRouter } from 'vue-router';
// import { CommonApi } from '@/api';
// import storage from '@/utils/storage';
import { useStore } from 'vuex';
export default defineComponent({
  setup(props, { attrs, slots, emit }) {
    // const router = useRouter();
    const store = useStore();
    // const root = ref(null);
    // console.log('props', props);
    // console.log('attrs', attrs);
    // console.log('slots', slots);
    // console.log('emit', emit);
    // console.log(store);
    onMounted(() => {
      window.onresize = () => {
        store.commit('app/setMode', document.body.clientWidth);
      };
      store.commit('app/setMode', document.body.clientWidth);
    });

    watch(
      () => store.state.keepAlive.list,
      (newValue, oldValue) => {
        console.log(newValue, oldValue);
      }
    );
    watch(
      () => store.state.app.mode,
      (newValue, oldValue) => {
        if (newValue === 'pc') {
          store.commit('app/updateThemeSetting', {
            sidebarCollapse: store.state.app.sidebarCollapseLastStatus,
          });
        } else {
          store.commit('app/updateThemeSetting', {
            sidebarCollapse: true,
          });
        }
        document.body.setAttribute('data-mode', store.state.app.mode);
      }
    );
    // // const { ctx, proxy } = getCurrentInstance();
    // // console.log(proxy);
    // storage('l').set('aaa', 666);
    // const toLink = (url: string) => {
    //   console.log(url);
    //   router.push(url);
    // };
    return () => {
      return <router-view />;
    };
  },
});
