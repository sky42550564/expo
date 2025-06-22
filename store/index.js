import { configureStore } from '@reduxjs/toolkit'; // 引入创建函数
import personal from './personal'; // 引入个人信息的slice

const store = configureStore({ // 创建一个store
  reducer: {
    personal, // 个人信息
  }
});

export default store;
