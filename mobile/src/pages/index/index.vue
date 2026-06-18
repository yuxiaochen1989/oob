<template>
  <view class="container">
    <van-nav-bar title="手工帮 - 首页" />
    <view class="content">
      <van-search v-model="keyword" placeholder="搜索图文/视频笔记" />
      <van-notice-bar left-icon="volume-o" text="欢迎来到手工帮，分享你的手工日常！" />
      
      <view class="banner">
        <text class="title">推荐笔记</text>
      </view>
      <van-empty description="暂无推荐笔记，快来发布第一篇吧！" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const keyword = ref('')
</script>

<style lang="less">
.container {
  min-height: 100vh;
  background-color: #f7f8fa;
  .content {
    padding-bottom: 50px;
  }
  .banner {
    padding: 15px;
    background: #fff;
    margin-top: 10px;
    .title {
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>