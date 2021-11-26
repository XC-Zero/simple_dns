module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer:{
    proxy:{
      '/api':{
        target:'http://192.168.88.99:6061',
        changeOrigin:true,
        pathRewrite:{
          '^/api':''
        }
      }
    },
    disableHostCheck:true,
    port:9537,
    host:'0.0.0.0',
  },
}
