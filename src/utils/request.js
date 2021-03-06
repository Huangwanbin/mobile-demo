import axios from 'axios'
import jsonBig from 'json-bigint' // 大数字处理
import store from '@/store'

// 创建一个新的axios实例对象request
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

request.defaults.transformResponse = [function (data) {
  try {
    // 现在我们定制使用json-Bigint来帮我们处理转换原始的JSON格式字符串
    // 这个方法类似于JSON.parse，只不过可以把超出js安全整数范围的数处理成正确的
    // 它内部有自己算法，会把大数字转成对象，我们用toString（）转成字符串格式
    return jsonBig.parse(data)
  } catch (error) {
    return {}
  }
}]

// 请求拦截
request.interceptors.request.use(
  function (config) {
    // console.log(config)
    const { user } = store.state
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 响应拦截
// request.interceptors.response.use(
//   function (response) {
//     return response
//   },
//   function (error) {
//     return Promise.reject(error)
//   }
// )

// 导出这个实例
export default request
