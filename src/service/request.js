import axios from 'axios'
import { useStore } from '@/store/index'
// import { DecryptData } from '../utils/aesDataModel'

export function request(config) {
  const instance = axios.create({
    baseURL: 'https://wx.hn.189.cn/sit/hndx_yidou',
    timeout: 5000
  })

  // 请求拦截器
  instance.interceptors.request.use(
    (config) => {
      if (config.url !== '/yidou/login' && config.url !== '/yidou/userinfo') {
        const store = useStore()

        const token = store.userInfo?.token
        config.headers['token'] = token
      }
      return config
    },
    (err) => {
      return err
    }
  )

  // 相应拦截器
  instance.interceptors.response.use(
    (res) => {
      return res.data
      // return DecryptData(res.data)
    },
    (err) => {
      return err
    }
  )

  return instance(config)
}
