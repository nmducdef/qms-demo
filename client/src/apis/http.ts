import axios, { type AxiosInstance } from 'axios'

const http: AxiosInstance = axios.create({
  baseURL: 'https://localhost:44397/api/',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

http.interceptors.request.use((config) => {
  return config
})

http.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      return Promise.reject(error.response)
    }
    return Promise.reject(error)
  }
)

export default http
