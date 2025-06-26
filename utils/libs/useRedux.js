import { actions, asyncActions } from '@/store';
import { useSelector, useDispatch } from 'react-redux'; // 引入修改全局状态的方法

// 用法： const { personal, store: personalStore } = useRedux("personal");
export default function useRedux(moduleName) { // 导出全局的快速方法
  const state = useSelector(reducer => reducer[moduleName]); // 取状态值
  const dispatch = useDispatch(); // 生成一个dispatch的函数
  const store = {};
  const _actions = actions[moduleName];
  const _asyncActions = asyncActions[moduleName];
  for (const actionName in _actions) {
    store[actionName] = (...params) => {
      const action = _actions[actionName];
      dispatch(action(...params));
    }
  }
  for (const actionName in _asyncActions) {
    store[actionName] = (...params) => {
      const action = _asyncActions[actionName];
      dispatch(action(...params));
    }
  }
  return { ...state, store };
}
