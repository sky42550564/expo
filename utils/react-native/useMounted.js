// 用法： useMounted(() => {});
export default (mountedFn) => {
  useEffect(() => {
    mountedFn();
  }, []);
}
