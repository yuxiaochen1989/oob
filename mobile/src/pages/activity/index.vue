<template>
  <view class="container">
    <van-nav-bar title="同城活动" />
    <view class="content">
      <!-- 城市切换下拉菜单 -->
      <van-dropdown-menu>
        <van-dropdown-item v-model="currentCity" :options="cityOptions" @change="onCityChange" />
      </van-dropdown-menu>
      
      <!-- 活动列表 -->
      <view class="activity-list" v-if="activityList.length > 0">
        <view class="activity-card" v-for="item in activityList" :key="item.id">
          <van-image width="100%" height="150" fit="cover" :src="item.cover_url" class="cover" />
          <view class="info">
            <text class="title van-ellipsis">{{ item.title }}</text>
            <view class="meta">
              <view class="time"><van-icon name="clock-o" /> {{ formatDate(item.start_time) }}</view>
              <view class="address"><van-icon name="location-o" /> {{ item.city_name }} - {{ item.address }}</view>
              <view class="participants">
                <van-icon name="friends-o" /> 已报名: {{ item.current_participants }}/{{ item.max_participants }}
              </view>
            </view>
            <van-button 
              round block 
              :type="item.current_participants >= item.max_participants ? 'default' : 'primary'" 
              :disabled="item.current_participants >= item.max_participants"
              class="signup-btn"
              @click="onSignup(item.id)"
            >
              {{ item.current_participants >= item.max_participants ? '名额已满' : '立即报名' }}
            </van-button>
          </view>
        </view>
      </view>

      <van-empty v-else description="当前城市暂无活动，去其他城市看看吧！" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import request from '../../utils/request';
import { showToast, showSuccessToast } from 'vant';

const currentCity = ref('全部城市');
const cityOptions = [
  { text: '全部城市', value: '全部城市' },
  { text: '北京市', value: '北京市' },
  { text: '上海市', value: '上海市' },
  { text: '广州市', value: '广州市' },
  { text: '深圳市', value: '深圳市' },
];

const activityList = ref<any[]>([]);

const fetchActivities = async () => {
  try {
    const res: any = await request.get(`/activity/list?city=${currentCity.value}`);
    activityList.value = res || [];
  } catch (error) {
    console.error('获取活动列表失败', error);
  }
};

const onCityChange = () => {
  fetchActivities();
};

const onSignup = async (id: number) => {
  try {
    const res: any = await request.post(`/activity/signup/${id}`);
    showSuccessToast(res.message || '报名成功');
    fetchActivities(); // 刷新列表更新报名人数
  } catch (error) {
    // 错误在 request 拦截器处理（如未登录会提示）
  }
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes() === 0 ? '00' : date.getMinutes()}`;
};

onShow(() => {
  fetchActivities();
});
</script>

<style lang="less">
.container {
  min-height: 100vh;
  background-color: #f7f8fa;
  .content {
    padding-bottom: 50px;
  }
  .activity-list {
    padding: 10px;
    .activity-card {
      background: #fff;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 15px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      .info {
        padding: 12px;
        .title {
          font-size: 16px;
          font-weight: bold;
          color: #333;
          margin-bottom: 8px;
          display: block;
        }
        .meta {
          font-size: 13px;
          color: #666;
          line-height: 1.8;
          margin-bottom: 10px;
          view {
            display: flex;
            align-items: center;
            gap: 4px;
          }
        }
        .signup-btn {
          margin-top: 10px;
          height: 36px;
        }
      }
    }
  }
}
</style>