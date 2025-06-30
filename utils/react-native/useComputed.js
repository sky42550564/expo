

// 用法： const fullName = useComputed((params) => params[0] + params[1], [firstName, lastName]);
export default (computeFn, dependencies) => {
  // 使用 useRef 存储上一次的依赖项，用于调试和验证
  const lastDepsRef = useRef(dependencies);
  
  return useMemo(() => {
    // 打印依赖变化信息（开发环境使用）
    if (process.env.NODE_ENV !== 'production') {
      const changedDeps = dependencies
        .map((dep, i) => (dep !== lastDepsRef.current[i] ? i : -1))
        .filter(i => i !== -1);
      
      if (changedDeps.length > 0) {
        console.log(`useComputed: 依赖项变化: ${changedDeps.map(i => `[${i}]`).join(', ')}`);
        console.log('  旧值:', lastDepsRef.current);
        console.log('  新值:', dependencies);
      }
      lastDepsRef.current = [...dependencies];
    }
    
    return computeFn();
  }, dependencies);
}
