import { createSlice } from '@reduxjs/toolkit'; // 引入创建片段的函数

export default createSlice({ // 参数是一个对象
  name: 'personal', // 必须是所有的Slice中的name唯一
  initialState: { // 初始状态
    personal: { name: '方运江', age: 10 },
  },
  reducers: { // 改变状态的函数
    setPersonal(state, action) {
      state.personal = action.payload;
    },
    updatePersonal(state, action) {
      state.personal = { ...state.personal, ...action.payload };
    },
  }
});
