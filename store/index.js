import { configureStore } from '@reduxjs/toolkit'; // 引入创建函数
import personal from './personal'; // 个人信息
// import option from './option'; // 全局配置

export const store = configureStore({
  reducer: {
    personal: personal.reducer, // 个人信息
    // option, // 全局配置
  }
});
export const actions = {
  personal: personal.actions,
};
