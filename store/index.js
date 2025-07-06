import { configureStore } from '@reduxjs/toolkit'; // 引入创建函数
import personal from './personal'; // 个人信息
import option from './option'; // 全局配置
import singleton from './singleton'; // 单例配置

// 用来给Provider注册的store
export const store = configureStore({
  reducer: {
    personal: personal.slice.reducer, // 个人信息
    option: option.slice.reducer, // 全局配置
    singleton: singleton.slice.reducer, // 单例配置
  }
});
// 修改state的方法
export const actions = {
  personal: personal.slice.actions,
  option: option.slice.actions,
  singleton: singleton.slice.actions,
};
// 异步修改state的方法
export const asyncActions = {
  personal: personal.asyncActions,
  option: option.asyncActions,
  singleton: singleton.asyncActions,
};
// 全局变量
export const datas = {
  personal: personal.datas,
  option: option.datas,
  singleton: singleton.datas,
};
// 普通全局函数
export const methods = {
  personal: personal.methods,
  option: option.methods,
  singleton: singleton.methods,
};
