import { defineStore } from 'pinia'
import {
  getBeanCount,
  getMobileInfo,
  getChangeKey,
  getToken,
  getviews
} from '../service/index'
import { DecryptData, getSm2Encrypt } from '@/utils/aesDataModel.js'

const localExchangeData = localStorage.getItem('exchangeData')

export const useStore = defineStore({
  id: 'globalState',
  state: () => ({
    beanCount: 0,
    userInfo: {},
    token: localStorage.getItem('token'),
    exchangeData: localExchangeData
      ? JSON.parse(DecryptData(localExchangeData))
      : {}
  }),
  getters: {},
  actions: {
    setExchangeData(content) {
      const option = getSm2Encrypt(JSON.stringify(content))
      localStorage.setItem('exchangeData', option)
      this.exchangeData = content
    },
    getQueryString(name) {
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      let r = window.location.search.substr(1).match(reg)
      let context = ''
      if (r != null) context = r[2]
      reg = null
      r = null
      return context == null || context == '' || context == 'undefined'
        ? ''
        : context
    },

    async getBeanCount() {
      const res = await getBeanCount()
      console.log('获取豆子数量')
      if (res.code) return
      this.beanCount = DecryptData(res.data)
    },
    async getUserMessage() {
      const res = await getMobileInfo()
      console.log('---', DecryptData(res.data))
      if (res.code) return
      this.userInfo = DecryptData(res.data)
      this.getBeanCount()
    },
    async login() {
      getviews().then((res) => {
        console.log(res)
      })
      // window.location.href =
      //   'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf07fe334d165709e&redirect_uri=https://wx.hn.189.cn/sit/hndx_yidou/yidou/login&response_type=code&scope=snsapi_userinfo&state=code'
      // const code = this.getQueryString('code')
      // console.log(code)
      // const keyData = await getChangeKey(code)
      // if (keyData.code) return
      // console.log(keyData)
      // const changeKey = keyData.changeKey
      // const tokenData = await getToken(changeKey)
      // console.log(tokenData)
      // if (tokenData.code === 777) {
      //   window.location.href =
      //     'https://wx.hn.189.cn/hndxym/hndx_cdweb_activities/newXbind/index'
      //   return
      // }
      // localStorage.setItem('token', tokenData.token)
      // this.token = tokenData.token
      // this.getUserMessage()
    }
  }
})
