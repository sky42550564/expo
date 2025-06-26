import { actions } from '@/store';
import { useSelector, useDispatch } from 'react-redux'; // 引入修改全局状态的方法

// 用法： const { personal, store: personalStore } = useRedux("personal");
export default function useRedux(moduleName) { // 导出全局的快速方法
  const state = useSelector(reducer => reducer[moduleName]); // 取状态值
  const dispatch = useDispatch(); // 生成一个dispatch的函数
  const store = {};
  const currentActions = actions[moduleName];
  for (const actionName in currentActions) {
    store[actionName] = (...params) => {
      const action = currentActions[actionName];
      dispatch(action(...params));
    }
  }
  return { ...state, store };
}
