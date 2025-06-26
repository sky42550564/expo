import { createSlice } from '@reduxjs/toolkit'; // 引入创建片段的函数

const slice = createSlice({ // 参数是一个对象
  name: 'option', // 必须是所有的Slice中的name唯一
  initialState: { // 初始状态
    option: {},
  },
  reducers: { // 改变状态的函数
    setOption(state, action) { // action.type 自动添加的， action.payload
      state.option = { ...state.option, ...action.payload };
    }
  }
});

export default { slice };
