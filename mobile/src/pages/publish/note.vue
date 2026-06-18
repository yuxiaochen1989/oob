<template>
  <view class="container">
    <van-nav-bar title="发布笔记" left-arrow @click-left="onClickLeft" />
    <view class="content">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="formData.title"
            name="title"
            label="标题"
            placeholder="填写标题会有更多赞哦~"
            :rules="[{ required: true, message: '请填写标题' }]"
          />
          <van-field
            v-model="formData.content"
            rows="4"
            autosize
            label="正文"
            type="textarea"
            placeholder="分享你的手工日常..."
            :rules="[{ required: true, message: '请填写正文' }]"
          />
          <van-field name="uploader" label="图片上传">
            <template #input>
              <van-uploader v-model="fileList" multiple :max-count="9" />
            </template>
          </van-field>
        </van-cell-group>
        <view style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">发布</van-button>
        </view>
      </van-form>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { showToast, showLoadingToast } from 'vant';
import request from '../../utils/request';

const formData = ref({
  title: '',
  content: '',
  type: 1, // 1表示图文笔记
  media_urls: [] as string[]
});

const fileList = ref([]);

const onClickLeft = () => {
  uni.navigateBack();
};

const onSubmit = async () => {
  if (fileList.value.length === 0) {
    showToast('请至少上传一张图片');
    return;
  }
  
  const loading = showLoadingToast({
    message: '发布中...',
    forbidClick: true,
  });

  try {
    // 这里为了演示，暂时用假地址。实际项目中应该先调用 OSS 接口上传获取真实 URL
    formData.value.media_urls = fileList.value.map((_, index) => `https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg?t=${Date.now()}${index}`);
    
    await request.post('/post', formData.value);
    loading.close();
    showToast('发布成功');
    setTimeout(() => {
      uni.switchTab({ url: '/pages/index/index' });
    }, 1000);
  } catch (error) {
    loading.close();
  }
};
</script>

<style lang="less">
.container {
  min-height: 100vh;
  background-color: #f7f8fa;
  .content {
    padding-top: 15px;
  }
}
</style>