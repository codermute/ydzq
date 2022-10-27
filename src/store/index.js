import { defineStore } from 'pinia'
import { getBeanCount, getUserInfo } from '../service/index'
import { getQueryString } from '../utils/index'
import { DecryptData, getSm2Encrypt } from '@/utils/aesDataModel.js'

const localExchangeData = localStorage.getItem('exchangeData')
const localUserInfo = localStorage.getItem('info')

export const useStore = defineStore({
  id: 'globalState',
  state: () => ({
    beanCount: 0,
    userInfo: localUserInfo ? DecryptData(localUserInfo) : {},
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
      if (res.code) return
      this.beanCount = DecryptData(res.data)
    },
    async login() {
      const code = getQueryString('code')
      const res = await getUserInfo(code)
      if (res.code === 777) {
        window.location.href =
          'https://wx.hn.189.cn/hndxym/hndx_cdweb_activities/newXbind/index'
        return
      }
      if (res.code) return
      console.log(DecryptData(res.data))
      const info = res.data
      localStorage.setItem('info', info)
      this.userInfo = DecryptData(info)
      this.getBeanCount()
    }
  }
})
