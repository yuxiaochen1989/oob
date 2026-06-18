<template>
  <view class="container">
    <van-nav-bar title="同城活动" />
    <view class="content">
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" />
        <van-dropdown-item v-model="value2" :options="option2" />
      </van-dropdown-menu>
      <van-empty description="附近暂无活动，发起一个吧！" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value1 = ref(0)
const value2 = ref('a')
const option1 = [
  { text: '全部城市', value: 0 },
  { text: '北京市', value: 1 },
  { text: '上海市', value: 2 },
]
const option2 = [
  { text: '默认排序', value: 'a' },
  { text: '距离最近', value: 'b' },
]
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