// 用法： useWillUnmount(() => {});
export default (unmountedFn) => {
  useEffect(() => {
    return () => {
      unmountedFn();
    }
  }, []);
}
