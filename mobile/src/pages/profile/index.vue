<template>
  <view class="container">
    <van-nav-bar title="我的" />
    <view class="content">
      <view class="user-info">
        <van-image round width="5rem" height="5rem" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
        <view class="detail">
          <text class="nickname">未登录</text>
          <text class="points">积分：0</text>
        </view>
      </view>
      
      <van-cell-group inset class="mt-10">
        <van-cell title="我的笔记" is-link />
        <van-cell title="我的收藏" is-link />
        <van-cell title="我的活动" is-link />
        <van-cell title="积分商城" is-link />
      </van-cell-group>
      
      <view class="btn-wrap">
        <van-button type="primary" block>点击登录</van-button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
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