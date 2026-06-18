<template>
  <view class="publish-container">
    <!-- 发布选项弹窗 -->
    <van-action-sheet
      v-model:show="show"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @select="onSelect"
      @cancel="onCancel"
      @click-overlay="onCancel"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onShow, onHide } from '@dcloudio/uni-app';

const show = ref(false);
const isNavigating = ref(false);

const actions = [
  { name: '发布笔记', id: 'note' },
  { name: '发布教程', id: 'course' },
];

onShow(() => {
  // 处理从内页返回时的逻辑，避免循环弹出
  if (isNavigating.value) {
    isNavigating.value = false;
    uni.switchTab({ url: '/pages/index/index' });
    return;
  }
  // 隐藏原生 TabBar，让 ActionSheet 看起来更自然
  uni.hideTabBar();
  // 延迟弹出，避免页面闪烁
  setTimeout(() => {
    show.value = true;
  }, 50);
});

onHide(() => {
  show.value = false;
  uni.showTabBar();
});

const onSelect = (item: any) => {
  show.value = false;
  isNavigating.value = true;
  if (item.id === 'note') {
    uni.navigateTo({ url: '/pages/publish/note' });
  } else {
    uni.navigateTo({ url: '/pages/publish/course' });
  }
};

const onCancel = () => {
  show.value = false;
  // 点击取消时返回首页
  uni.switchTab({ url: '/pages/index/index' });
};
</script>

<style>
page {
  background: transparent;
}
.publish-container {
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.4); /* 半透明遮罩 */
}
</style>