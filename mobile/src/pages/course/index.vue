<template>
  <view class="container">
    <van-nav-bar title="手工教程" />
    <view class="content">
      <van-tabs v-model:active="activeTab" @change="onTabChange" sticky animated>
        <van-tab title="图文教程" name="3"></van-tab>
        <van-tab title="视频教程" name="4"></van-tab>
      </van-tabs>

      <view class="course-list" v-if="courseList.length > 0">
        <view class="course-card" v-for="item in courseList" :key="item.id">
          <!-- 视频教程封面带播放图标 (为了演示用普通图片代替) -->
          <view class="cover-wrap">
            <van-image width="100%" height="180" fit="cover" :src="item.media_urls?.[0] || 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'" />
            <view class="play-icon" v-if="item.type === 4">
              <van-icon name="play-circle-o" size="40" color="#fff" />
            </view>
          </view>
          
          <view class="info">
            <text class="title van-multi-ellipsis--l2">{{ item.title }}</text>
            <view class="author">
              <van-image round width="20" height="20" :src="item.user?.avatar" />
              <text class="name">{{ item.user?.nickname }}</text>
            </view>
            <view class="meta">
              <text><van-icon name="eye-o" /> {{ item.like_count * 10 }}</text>
              <text><van-icon name="like-o" /> {{ item.like_count }}</text>
            </view>
          </view>
        </view>
      </view>

      <van-empty v-else description="暂无该类型的教程" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import request from '../../utils/request';

const activeTab = ref('3'); // 默认图文教程 type=3
const courseList = ref<any[]>([]);

const fetchCourses = async () => {
  try {
    // 3: 图文教程, 4: 视频教程
    const res: any = await request.get(`/post/list?type=${activeTab.value}`);
    courseList.value = res || [];
  } catch (error) {
    console.error('获取教程列表失败', error);
  }
};

const onTabChange = () => {
  fetchCourses();
};

onShow(() => {
  fetchCourses();
});
</script>

<style lang="less">
.container {
  min-height: 100vh;
  background-color: #f7f8fa;
  .content {
    padding-bottom: 50px;
  }
  .course-list {
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    .course-card {
      background: #fff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      .cover-wrap {
        position: relative;
        .play-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0.8;
        }
      }
      .info {
        padding: 10px;
        .title {
          font-size: 14px;
          font-weight: bold;
          color: #333;
          margin-bottom: 8px;
          line-height: 1.4;
          height: 40px; /* 两行高度 */
        }
        .author {
          display: flex;
          align-items: center;
          margin-bottom: 6px;
          .name {
            font-size: 12px;
            color: #666;
            margin-left: 6px;
          }
        }
        .meta {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>