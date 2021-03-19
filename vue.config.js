/*
 * @Author: Vhen
 * @Date: 2021-03-03 09:15:48
 * @LastEditors: Vhen
 * @LastEditTime: 2021-03-03 09:52:44
 * @Description:
 */
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

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
  configureWebpack: {
    resolve: {
      //路径别名配置
      alias: {
        '@': resolve('src'),
        assets: resolve('@/assets'),
        components: resolve('@/components'),
        views: resolve('@/views'),
      },
    },
  },

  chainWebpack: (config) => {
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
