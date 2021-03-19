/*
 * @Author: Vhen
 * @Date: 2021-03-02 15:56:43
 * @LastEditors: Vhen
 * @LastEditTime: 2021-03-19 10:53:00
 * @Description:   api-announcement/imgConfigure/getImgConfigureList  api-auction-server/auction/hall/list
 */
import { defineComponent, getCurrentInstance, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { CommonApi } from '@/api';
import storage from '@/utils/storage';
export default defineComponent({
  async getImgConfigureList() {
    try {
      const res = CommonApi.getImgConfigureList();
      console.log(res);
    } catch (error) {}
  },
  onMounted() {},
  setup() {
    const router = useRouter();

    // const { ctx, proxy } = getCurrentInstance();
    // console.log(proxy);
    storage('l').set('aaa', 666);
    const toLink = (url: string) => {
      console.log(url);
      router.push(url);
    };
    return () => {
      return (
        <div id="app">
          <div id="nav">
            <svg-icon name="icon-auth"></svg-icon>
            <el-button
              type="primary"
              onClick={() => {
                toLink('/');
              }}
            >
              home
            </el-button>
            <el-button
              type="primary"
              onClick={() => {
                toLink('/about');
              }}
            >
              about
            </el-button>
          </div>
          <router-view />
        </div>
      );
    };
  },
});
