// 用法： const fullName = useComputed(() => firstName + lastName, [firstName, lastName]);
export default (computeFn, dependencies = []) => {
  return useMemo(() => {
    return computeFn();
  }, dependencies);
}
