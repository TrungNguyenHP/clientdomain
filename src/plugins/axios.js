
import axios from 'axios'
import { loadingStore } from '@/stores/loadingStore'

const api = axios.create({
  baseURL: 'http://localhost:5246/api',
})

api.interceptors.request.use(config => {
  const loading = loadingStore()
  loading.startLoading()
  return config
}, error => {
  const loading = loadingStore()
  loading.stopLoading()
  return Promise.reject(error)
})

api.interceptors.response.use(response => {
  const loading = loadingStore()
  loading.stopLoading()
  return response
}, error => {
  const loading = loadingStore()
  loading.stopLoading()
  return Promise.reject(error)
})

export default api
