<template>
  <view class="container">
    <van-nav-bar title="积分商城" left-arrow @click-left="onClickLeft" />
    <view class="header">
      <text class="label">当前可用积分</text>
      <text class="points">{{ userStore.userInfo?.points || 0 }}</text>
    </view>

    <view class="content">
      <view class="shop-list" v-if="shopItems.length > 0">
        <view class="shop-card" v-for="item in shopItems" :key="item.id">
          <van-image width="100%" height="150" fit="cover" :src="item.cover_url" class="cover" />
          <view class="info">
            <text class="title van-ellipsis">{{ item.name }}</text>
            <view class="meta">
              <text class="price"><text class="num">{{ item.points_price }}</text> 积分</text>
              <text class="stock">库存: {{ item.stock }}</text>
            </view>
            <van-button 
              round block 
              :type="item.stock <= 0 ? 'default' : 'danger'" 
              :disabled="item.stock <= 0 || (userStore.userInfo?.points || 0) < item.points_price"
              class="exchange-btn"
              @click="onExchange(item)"
            >
              {{ item.stock <= 0 ? '已售罄' : '立即兑换' }}
            </van-button>
          </view>
        </view>
      </view>
      <van-empty v-else description="商城暂无商品上架" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import request from '../../utils/request';
import { useUserStore } from '../../store/user';
import { showConfirmDialog, showSuccessToast } from 'vant';

const userStore = useUserStore();
const shopItems = ref<any[]>([]);

const onClickLeft = () => {
  uni.navigateBack();
};

const fetchShopItems = async () => {
  try {
    const res: any = await request.get('/shop/items');
    shopItems.value = res || [];
  } catch (error) {
    console.error('获取商品列表失败', error);
  }
};

const onExchange = (item: any) => {
  showConfirmDialog({
    title: '确认兑换',
    message: `确定要花费 ${item.points_price} 积分兑换【${item.name}】吗？`,
  }).then(async () => {
    try {
      await request.post(`/shop/exchange/${item.id}`);
      showSuccessToast('兑换成功！');
      // 刷新数据
      fetchShopItems();
      userStore.fetchUserInfo();
    } catch (error) {
      // 错误拦截器已处理
    }
  }).catch(() => {
    // on cancel
  });
};

onShow(() => {
  fetchShopItems();
  userStore.fetchUserInfo(); // 同步最新积分
});
</script>

<style lang="less">
.container {
  min-height: 100vh;
  background-color: #f7f8fa;
  .header {
    background: linear-gradient(135deg, #1989fa, #005eb8);
    padding: 30px 20px;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    .label {
      font-size: 14px;
      opacity: 0.9;
    }
    .points {
      font-size: 36px;
      font-weight: bold;
      margin-top: 10px;
    }
  }
  .content {
    padding-bottom: 50px;
  }
  .shop-list {
    padding: 15px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    .shop-card {
      background: #fff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      .info {
        padding: 10px;
        .title {
          font-size: 14px;
          font-weight: bold;
          color: #333;
          margin-bottom: 8px;
          display: block;
        }
        .meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          .price {
            color: #ee0a24;
            font-size: 12px;
            .num {
              font-size: 16px;
              font-weight: bold;
            }
          }
          .stock {
            font-size: 12px;
            color: #999;
          }
        }
        .exchange-btn {
          height: 32px;
          font-size: 13px;
        }
      }
    }
  }
}
</style>