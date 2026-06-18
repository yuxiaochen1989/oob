<template>
  <view class="container">
    <van-nav-bar title="发布教程" left-arrow @click-left="onClickLeft" />
    <view class="content">
      <van-empty description="系统教程发布功能开发中..." />
    </view>
  </view>
</template>

<script setup lang="ts">
const onClickLeft = () => {
  uni.navigateBack();
};
</script>

<style lang="less">
.container {
  min-height: 100vh;
  background-color: #f7f8fa;
}
</style>