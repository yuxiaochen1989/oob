import axios from 'axios';
import { showToast } from 'vant';

const request = axios.create({
  baseURL: 'http://localhost:3000', // 后端地址
  timeout: 10000,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = uni.getStorageSync('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      const msg = error.response.data.message || '请求失败';
      showToast(msg);
      if (error.response.status === 401) {
        uni.removeStorageSync('token');
        // 可选：跳转到登录页
      }
    } else {
      showToast('网络错误');
    }
    return Promise.reject(error);
  }
);

export default request;