import axios from 'axios'
import qs from 'qs'

const http = axios.create({
  baseURL: 'https://api.cnblogs.com',
  timeout: 10000
})

http.interceptors.request.use(config => {
  var token = global._token2 || global._token1 || ''
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default {
  ...http,
  stringify: qs.stringify,
  parse: qs.parse
}
