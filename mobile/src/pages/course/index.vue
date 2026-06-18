<template>
  <view class="container">
    <van-nav-bar title="手工教程" />
    <view class="content">
      <van-tabs v-model:active="active">
        <van-tab title="图文教程"></van-tab>
        <van-tab title="视频教程"></van-tab>
      </van-tabs>
      <van-empty description="海量教程筹备中，敬请期待！" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const active = ref(0)
</script>

<style lang="less">
.container {
  min-height: 100vh;
  background-color: #f7f8fa;
  .content {
    padding-bottom: 50px;
  }
}
</style>