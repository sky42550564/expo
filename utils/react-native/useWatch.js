// 用法： useWatch(() => state.fullName = firstName + lastName, [firstName, lastName], true);
export default (watchFn, dependencies = [], immediate) => {
  const isMounted = useRef(true);
  return useEffect(() => {
    if (isMounted.current && !immediate) {
      isMounted.current = false;
      return;
    }
    return watchFn();
  }, dependencies);
}
