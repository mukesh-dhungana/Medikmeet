import AsyncStorage from '@react-native-async-storage/async-storage'
import axios, { InternalAxiosRequestConfig } from 'axios'
import { JWT_KEY } from './sharedPrefKeys'

export const BASE_API_PATH = '/api/v1/'

// Setting base URL for backend requests
const instance = axios.create({
  baseURL:
    process.env.REACT_APP_API_ENDPOINT !== undefined
      ? process.env.REACT_APP_API_ENDPOINT
      : 'https://Medikmeet-be.softdevels.com',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

instance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  let jwt: any = await AsyncStorage.getItem(JWT_KEY)
  // jwt = {
  //   access_token:
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c0BtYWlsc2FjLmNvbSIsImxvZ2luX2lkIjoxODcsImV4cCI6MTY4NDY2NjI0MX0.Tqh7LY-8dxIOk_cS6ypCBW9c_E0r0_6wzlIrSAtgHCE',
  // }
  jwt = JSON.parse(jwt || '{}')

  if (jwt?.access_token) {
    config.headers['Authorization'] = `Bearer ${jwt?.access_token}`
  }
  return config
})

export default instance
