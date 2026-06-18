<template>
  <view class="login-container">
    <van-nav-bar title="登录 / 注册" left-arrow @click-left="onClickLeft" />
    
    <view class="logo-wrap">
      <image class="logo" src="/static/logo.png" mode="aspectFit" />
      <text class="title">手工帮</text>
    </view>

    <van-tabs v-model:active="activeTab" animated>
      <van-tab title="登录">
        <van-form @submit="onLoginSubmit" class="form">
          <van-cell-group inset>
            <van-field
              v-model="loginForm.account"
              name="account"
              label="账号/手机"
              placeholder="请输入账号或手机号"
              :rules="[{ required: true, message: '请填写账号或手机号' }]"
            />
            <van-field
              v-model="loginForm.password"
              type="password"
              name="password"
              label="密码"
              placeholder="请输入密码"
              :rules="[{ required: true, message: '请填写密码' }]"
            />
          </van-cell-group>
          <view style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">登录</van-button>
          </view>
        </van-form>
      </van-tab>
      
      <van-tab title="注册">
        <van-form @submit="onRegisterSubmit" class="form">
          <van-cell-group inset>
            <van-field
              v-model="registerForm.username"
              name="username"
              label="账号"
              placeholder="请输入4-20位账号"
              :rules="[{ required: true, message: '请填写账号' }]"
            />
            <van-field
              v-model="registerForm.phone"
              name="phone"
              label="手机号"
              placeholder="请输入11位手机号"
              :rules="[{ required: true, message: '请填写手机号' }]"
            />
            <van-field
              v-model="registerForm.password"
              type="password"
              name="password"
              label="密码"
              placeholder="请输入6-20位密码"
              :rules="[{ required: true, message: '请填写密码' }]"
            />
          </van-cell-group>
          <view style="margin: 16px;">
            <van-button round block type="success" native-type="submit">注册</van-button>
          </view>
        </van-form>
      </van-tab>
    </van-tabs>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import request from '../../utils/request';
import { useUserStore } from '../../store/user';
import { showToast } from 'vant';

const activeTab = ref(0);
const userStore = useUserStore();

const loginForm = ref({
  account: '',
  password: ''
});

const registerForm = ref({
  username: '',
  phone: '',
  password: ''
});

const onClickLeft = () => {
  uni.navigateBack();
};

const onLoginSubmit = async () => {
  try {
    const isPhone = /^\d{11}$/.test(loginForm.value.account);
    const payload: any = { password: loginForm.value.password };
    if (isPhone) {
      payload.phone = loginForm.value.account;
    } else {
      payload.username = loginForm.value.account;
    }

    const res: any = await request.post('/user/login', payload);
    if (res.access_token) {
      showToast('登录成功');
      userStore.setToken(res.access_token);
      await userStore.fetchUserInfo();
      uni.navigateBack(); // 返回上一页
    }
  } catch (err) {
    // 错误在拦截器中处理
  }
};

const onRegisterSubmit = async () => {
  try {
    await request.post('/user/register', registerForm.value);
    showToast('注册成功，请登录');
    activeTab.value = 0; // 切换到登录Tab
    loginForm.value.account = registerForm.value.username;
  } catch (err) {
    // 错误在拦截器中处理
  }
};
</script>

<style lang="less">
.login-container {
  min-height: 100vh;
  background-color: #f7f8fa;
  .logo-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 0 20px;
    .logo {
      width: 80px;
      height: 80px;
    }
    .title {
      margin-top: 10px;
      font-size: 20px;
      font-weight: bold;
      color: #333;
    }
  }
  .form {
    margin-top: 20px;
  }
}
</style>