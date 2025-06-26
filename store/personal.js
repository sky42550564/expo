import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; // 引入创建片段的函数

// 异步函数
const asyncActions = {
  getPersonalInfo: createAsyncThunk(
    'personal/getPersonalInfo',
    async (xx) => {
      console.log('=================xx', xx);
      await utils.sleep(3000);
      return { name: '方运江' + Math.random(), age: 10 }
      // const response = await api.getPersonalInfo();
      // return response; // 返回个人信息对象
    }
  )
};

const slice = createSlice({ // 参数是一个对象
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
  },
  extraReducers: (builder) => {
    // getPersonalInfo
    builder.addCase(asyncActions.getPersonalInfo.fulfilled, (state, action) => {
      state.personal = action.payload;
    });
  },
});

export default { asyncActions, slice };
