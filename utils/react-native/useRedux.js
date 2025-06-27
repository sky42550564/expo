import { actions, asyncActions, datas, methods } from '@/store';
import { useSelector, useDispatch } from 'react-redux'; // 引入修改全局状态的方法

// 用法： const { personal, store: personalStore } = useRedux("personal");
export default function useRedux(moduleName) { // 导出全局的快速方法
  const state = useSelector(reducer => reducer[moduleName]); // 取状态值
  const dispatch = useDispatch(); // 生成一个dispatch的函数
  const store = {};
  // 封装同步action
  const _actions = actions[moduleName];
  for (const key in _actions) {
    store[key] = (...params) => {
      const action = _actions[key];
      dispatch(action(...params));
    }
  }
  // 封装异步action
  const _asyncActions = asyncActions[moduleName];
  for (const key in _asyncActions) {
    store[key] = (...params) => {
      const action = _asyncActions[key];
      dispatch(action(...params));
    }
  }
  // 封装普通函数
  const _methods = methods[moduleName];
  for (const key in _methods) {
    store[key] = (...params) => {
      const method = _methods[key];
      method(store, state, ...params);
    }
  }
  return { ...state, store, ...datas?.[moduleName] };
}
