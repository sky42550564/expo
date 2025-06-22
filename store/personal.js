import { createSlice } from '@reduxjs/toolkit'; // 引入创建片段的函数

const slice = createSlice({ // 参数是一个对象
  name: 'personal', // 必须是所有的Slice中的name唯一
  initialState: { // 初始状态
    personal: { name: '方运江' },
  },
  reducers: { // 改变状态的函数
    setPersonal(perState, action) { // action.type 自动添加的， action.payload
      console.log('=================', {perState, action} );
      // 修改全局状态的值
      perState.personal = action.payload; // 这里就是setGlobalPersonal(data)中的data
      // 把新的状态返回回去
    }
  }
});
export const { setPersonal } = slice.actions; // 把定义的函数导出去
export default slice.reducer; // 默认需要导出slice的reducer
