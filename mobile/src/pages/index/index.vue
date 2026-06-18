<template>
  <view class="container">
    <van-nav-bar title="手工帮 - 首页" />
    <view class="content">
      <van-search v-model="keyword" placeholder="搜索图文/视频笔记" />
      <van-notice-bar left-icon="volume-o" text="欢迎来到手工帮，分享你的手工日常！" />
      
      <view class="banner">
        <text class="title">推荐笔记</text>
      </view>
      
      <view class="post-list" v-if="postList.length > 0">
        <view class="post-item" v-for="post in postList" :key="post.id">
          <view class="user">
            <van-image round width="30" height="30" :src="post.user?.avatar || 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'" />
            <text class="nickname">{{ post.user?.nickname }}</text>
          </view>
          <text class="post-title">{{ post.title }}</text>
          <text class="post-content van-multi-ellipsis--l2">{{ post.content }}</text>
          <view class="images" v-if="post.media_urls && post.media_urls.length > 0">
            <van-image 
              v-for="(url, index) in post.media_urls.slice(0, 3)" 
              :key="index"
              width="30%" 
              height="80" 
              fit="cover" 
              :src="url" 
              class="img"
            />
          </view>
          <view class="actions">
            <view class="action-item"><van-icon name="like-o" /> {{ post.like_count }}</view>
            <view class="action-item"><van-icon name="star-o" /> {{ post.collect_count }}</view>
            <view class="action-item"><van-icon name="chat-o" /> {{ post.comment_count }}</view>
          </view>
        </view>
      </view>
      
      <van-empty v-else description="暂无推荐笔记，快来发布第一篇吧！" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import request from '../../utils/request';

const keyword = ref('');
const postList = ref<any[]>([]);

const fetchPosts = async () => {
  try {
    const res: any = await request.get('/post/list');
    postList.value = res || [];
  } catch (error) {
    console.error('获取笔记列表失败', error);
  }
};

onShow(() => {
  fetchPosts();
});
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
  .post-list {
    .post-item {
      background: #fff;
      margin-top: 10px;
      padding: 15px;
      .user {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .nickname {
          margin-left: 10px;
          font-size: 14px;
          color: #333;
        }
      }
      .post-title {
        font-size: 16px;
        font-weight: bold;
        color: #333;
        margin-bottom: 5px;
        display: block;
      }
      .post-content {
        font-size: 14px;
        color: #666;
        margin-bottom: 10px;
        line-height: 1.5;
      }
      .images {
        display: flex;
        gap: 5%;
        margin-bottom: 10px;
        .img {
          border-radius: 4px;
          overflow: hidden;
        }
      }
      .actions {
        display: flex;
        justify-content: space-around;
        border-top: 1px solid #eee;
        padding-top: 10px;
        color: #999;
        font-size: 13px;
        .action-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }
      }
    }
  }
}
</style>