import axios from 'axios'
import { useStore } from '@/store/index'
// import { DecryptData } from '../utils/aesDataModel'

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://134.160.137.193:8081/hndx_intf_act',
    timeout: 5000
  })

  // 请求拦截器
  instance.interceptors.request.use(
    (config) => {
      if (config.url !== '/yidou/login' && config.url !== '/yidou/token') {
        const store = useStore()

        const token = store.token || localStorage.getItem('token')
        config.headers['token'] = token
        console.log(token, '9999999999')
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
