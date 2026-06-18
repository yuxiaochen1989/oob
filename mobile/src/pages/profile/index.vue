<template>
  <view class="container">
    <van-nav-bar title="我的" />
    <view class="content">
      <view class="user-info">
        <van-image round width="5rem" height="5rem" :src="userStore.userInfo?.avatar || 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'" />
        <view class="detail" v-if="userStore.token && userStore.userInfo">
          <text class="nickname">{{ userStore.userInfo.nickname || userStore.userInfo.username }}</text>
          <text class="points">积分：{{ userStore.userInfo.points || 0 }}</text>
        </view>
        <view class="detail" v-else @click="goLogin">
          <text class="nickname">点击登录</text>
          <text class="points">登录后享受更多特权</text>
        </view>
      </view>
      
      <van-cell-group inset class="mt-10">
        <van-cell title="我的笔记" is-link />
        <van-cell title="我的收藏" is-link />
        <van-cell title="我的活动" is-link />
        <van-cell title="积分商城" is-link />
      </van-cell-group>
      
      <view class="btn-wrap" v-if="userStore.token">
        <van-button type="danger" block @click="onLogout">退出登录</van-button>
      </view>
      <view class="btn-wrap" v-else>
        <van-button type="primary" block @click="goLogin">去登录</van-button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app';
import { useUserStore } from '../../store/user';
import { showConfirmDialog } from 'vant';

const userStore = useUserStore();

onShow(() => {
  // 每次进入页面时检查
  if (!userStore.token) {
    uni.navigateTo({ url: '/pages/login/index' });
    return;
  }
  
  if (!userStore.userInfo) {
    userStore.fetchUserInfo();
  }
});

const goLogin = () => {
  uni.navigateTo({ url: '/pages/login/index' });
};

const onLogout = () => {
  showConfirmDialog({
    title: '提示',
    message: '确定要退出登录吗？',
  }).then(() => {
    userStore.logout();
    // 退出后立刻跳转登录页
    uni.navigateTo({ url: '/pages/login/index' });
  }).catch(() => {
    // on cancel
  });
};
</script>

<style lang="less">
.container {
  min-height: 100vh;
  background-color: #f7f8fa;
  .content {
    padding-bottom: 50px;
  }
  .user-info {
    display: flex;
    align-items: center;
    padding: 20px;
    background: #fff;
    .detail {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      .nickname {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 5px;
      }
      .points {
        font-size: 14px;
        color: #666;
      }
    }
  }
  .mt-10 {
    margin-top: 10px;
  }
  .btn-wrap {
    margin: 20px 16px;
  }
}
</style>