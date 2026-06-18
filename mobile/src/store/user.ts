import { defineStore } from 'pinia';
import request from '../utils/request';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: uni.getStorageSync('token') || '',
    userInfo: null as any,
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
      uni.setStorageSync('token', token);
    },
    async fetchUserInfo() {
      if (!this.token) return;
      try {
        const res: any = await request.get('/user/profile');
        this.userInfo = res;
      } catch (error) {
        console.error('获取用户信息失败', error);
      }
    },
    logout() {
      this.token = '';
      this.userInfo = null;
      uni.removeStorageSync('token');
    }
  }
});