import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; // 引入创建片段的函数
import config from '@/config';

// 异步函数
const asyncActions = {
  refreshPersonal: createAsyncThunk(
    'personal/refreshPersonal',
    async (params) => {
      await utils.sleep(3000);
      return { name: '方运江' + Math.random(), age: 10 }
      const checkPlatform = params ? undefined : sr.platform; // 如果没有传递参数，则检查这个平台个人中心的信息是否改变，如果改变，则重新拉去个人心中的信息
      const data = await api.getPersonalInfo({
        checkPlatform,
        $wait: false,
        $noLog: checkPlatform ? config.noNotifyLog : false,
        ...params,
      });
      if (!data.success) return {};
      return data.result;
    }
  )
};

const slice = createSlice({ // 参数是一个对象
  name: 'personal', // 必须是所有的Slice中的name唯一
  initialState: { // 初始状态
    personal: { name: '方运江', age: 10 },
  },
  reducers: { // 改变状态的函数
    // 设置个人信息的方法
    setPersonal(state, action) {
      state.personal = action.payload;
    },
    // 修改个人信息的方法
    updatePersonal(state, action) {
      state.personal = { ...state.personal, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    // 强制更新个人信息
    builder.addCase(asyncActions.refreshPersonal.fulfilled, (state, action) => {
      state.personal = action.payload;
    });
  },
});

export default { asyncActions, slice };
