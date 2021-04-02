/*
 * @Author: Vhen
 * @Date: 2021-03-03 09:15:48
 * @LastEditors: Vhen
 * @LastEditTime: 2021-04-01 10:44:42
 * @Description:
 */
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const port = process.env.port || process.env.npm_config_port || 9520;
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    disableHostCheck: true,
    proxy: {
      '/*': {
        target: process.env.VUE_APP_URL, //请求的目标地址 process.env.VUE_APP_URL
        changeOrigin: true,
        ws: false,
        secure: false,
        logLevel: 'debug',
        pathRewrite: {},
      },
    },
    // before: require('./mock/index.js')
  },
  configureWebpack: (config) => {
    //路径别名配置
    config.resolve.alias = {
      '@': resolve('src'),
      assets: resolve('@/assets'),
      components: resolve('@/components'),
      views: resolve('@/views'),
    };
    if (IS_PROD) {
      config.externals = {
        vue: 'Vue',
        'element-ui': 'ELEMENT',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        axios: 'axios',
      };
    }
  },
  chainWebpack: (config) => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store;
    oneOfsMap.forEach((item) => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: ['src/design/index.scss'],
        })
        .end();
    });

    // const cdn = {
    //   // 访问https://unpkg.com/element-ui/lib/theme-chalk/index.css获取最新版本
    //   css: ['//unpkg.com/element-ui@2.10.1/lib/theme-chalk/index.css'],
    //   js: [
    //     '//unpkg.com/vue@2.6.10/dist/vue.min.js', // 访问https://unpkg.com/vue/dist/vue.min.js获取最新版本
    //     '//unpkg.com/vue-router@3.0.6/dist/vue-router.min.js',
    //     '//unpkg.com/vuex@3.1.1/dist/vuex.min.js',
    //     '//unpkg.com/axios@0.19.0/dist/axios.min.js',
    //     '//unpkg.com/element-ui@2.10.1/lib/index.js',
    //   ],
    // };
    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    // config.plugin('html').tap((args) => {
    //   // html中添加cdn
    //   args[0].cdn = cdn;
    //   return args;
    // });

    //配置 svg-sprite-loader
    // 第一步：让其他svg loader不要对src/icons进行操作

    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons/svg')) //注意：路径要具体到存放的svg的路径下，不然会报错
      .end();
    // 第二步：使用svg-sprite-loader 对 src/icons下的svg进行操作
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons/svg')) //注意：路径要具体到存放的svg的路径下，不然会报错
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      //定义规则 使用时 <icon-svg class="icon"> <use xlink:href="#icon-svg文件名"></use>  </svg>
      .options({
        symbolId: '[name]',
      })
      .end();
  },
};
