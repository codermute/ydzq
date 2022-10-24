import { defineStore } from 'pinia'
import {
  getBeanCount,
  // authorizationLogin,
  getUserInfo
} from '../service/index'
import { getQueryString } from '../utils/index'
import { DecryptData, getSm2Encrypt } from '@/utils/aesDataModel.js'

const localExchangeData = localStorage.getItem('exchangeData')
const localUserInfo = localStorage.getItem('info')

export const useStore = defineStore({
  id: 'globalState',
  state: () => ({
    beanCount: 0,
    userInfo: localUserInfo ? DecryptData(localExchangeData) : {},
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

    async getBeanCount() {
      const res = await getBeanCount()
      console.log('获取豆子数量')
      if (res.code) return
      this.beanCount = DecryptData(res.data)
    },
    async login() {
      // authorizationLogin()
      console.log(getQueryString('code'))
      const code = getQueryString('code')
      const res = await getUserInfo(code)
      console.log(res)
      if (res.code === 777) {
        window.location.href =
          'https://wx.hn.189.cn/hndxym/hndx_cdweb_activities/newXbind/index'
        return
      }
      if (res.code) return
      console.log(DecryptData(res.data), res)
      const info = res.data
      localStorage.setItem('info', info)
      this.userInfo = DecryptData(info)
      this.getBeanCount()
    }
  }
})
