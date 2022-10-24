module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://wx.hn.189.cn/sit/hndx_yidou',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
  lintOnSave: false
}
