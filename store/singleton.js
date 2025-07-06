import { createSlice } from '@reduxjs/toolkit'; // 引入创建片段的函数

const slice = createSlice({ // 参数是一个对象
  name: 'singleton', // 必须是所有的Slice中的name唯一
  initialState: { // 初始状态
    value: {},
  },
  reducers: { // 改变状态的函数
    setValue(state, action) { // 设置value
      state.value = { ...action.payload };
    },
    updateValue(state, action) {// 更新value
      state.value = { ...state.value, ...action.payload };
    },
  }
});

// 普通方法
const methods = {
  // 参数是store, state
  // 只获取type对应的值
  type(store, state, type) {
    return state.value[type];
  },
  // 手动设置type对应的值
  setType(store, state, type, data) {
    store.updateValue({ [type]: data });
  },
  // 获取单例的值
  async getType(store, state, { type, table, api, params = {}, resultKey = 'list', force = false }, options) {
    if (state.value[type] && !force) { // 如果缓存存在，直接返回
      return state.value[type];
    }
    if (_.isFunction(params)) {
      params = params(options);
    }
    if (!api && !params.pageSize) { // 如果是拉取列表的时候，默认拉取1000个
      params.pageSize = 1000;
    }
    const data = await utils.post(api || `/list/${table || type}`, params); // 如果指定了api，就从api拉取
    if (data.success) { // 如果服务器返回成功
      store.updateValue({ [type]: resultKey ? _.get(data.result, resultKey) : data.result });
      return state.value[type];
    }
    return null;
  }
};


export default { slice, methods };

