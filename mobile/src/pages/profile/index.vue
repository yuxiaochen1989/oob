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
        
        <van-button 
          v-if="userStore.token" 
          type="primary" 
          size="small" 
          round 
          class="checkin-btn"
          @click="onCheckIn"
        >
          每日签到
        </van-button>
      </view>
      
      <van-cell-group inset class="mt-10">
        <van-cell title="我的笔记" is-link />
        <van-cell title="我的收藏" is-link />
        <van-cell title="我的活动" is-link />
        <van-cell title="积分商城" is-link @click="goShop" />
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
import { showConfirmDialog, showSuccessToast } from 'vant';
import request from '../../utils/request';

const userStore = useUserStore();

onShow(() => {
  // 每次进入页面时检查
  if (!userStore.token) {
    uni.navigateTo({ url: '/pages/login/index' });
    return;
  }
  
  // 刷新用户信息(包含最新积分)
  userStore.fetchUserInfo();
});

const goLogin = () => {
  uni.navigateTo({ url: '/pages/login/index' });
};

const goShop = () => {
  uni.navigateTo({ url: '/pages/shop/index' });
};

const onCheckIn = async () => {
  try {
    const res: any = await request.post('/shop/checkin');
    showSuccessToast(`签到成功！积分 +${res.points_added}`);
    // 重新拉取用户信息更新积分
    userStore.fetchUserInfo();
  } catch (error) {
    // 错误拦截器已处理
  }
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
    position: relative;
    .detail {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      flex: 1;
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
    .checkin-btn {
      position: absolute;
      right: 20px;
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