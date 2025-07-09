import axios from 'axios'
import { useAuthStore } from '@/stores/useAuthStore'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// 请求拦截器，自动注入token
api.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截器，处理错误，同时刷新token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const res = await api.post('/auth/refresh-token')
        originalRequest.headers.Authorization = `Bearer ${res.data.token}`
        return api(originalRequest)
      } catch (err) {
        useAuthStore.getState().logout()
        return Promise.reject(err)
      }
    }
    return Promise.reject(error)
  }
)

export default api
