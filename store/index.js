import { configureStore } from '@reduxjs/toolkit'; // 引入创建函数
import personal from './personal'; // 个人信息
import option from './option'; // 全局配置

// 用来给Provider注册的store
export const store = configureStore({
  reducer: {
    personal: personal.slice.reducer, // 个人信息
    option: option.slice.reducer, // 全局配置
  }
});
// 修改state的方法
export const actions = {
  personal: personal.slice.actions,
  option: option.slice.actions,
};
// 异步修改state的方法
export const asyncActions = {
  personal: personal.asyncActions,
  option: option.asyncActions,
};
