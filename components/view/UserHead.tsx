export default (props: any) => {
  const {
    user,
    headKey = 'head', // 头像对应的key，默认为head
    nameKey = 'name', // 姓名对应的key，默认为name
    size = 42,
  } = props;
  const [failed, setFailed] = useState(false);
  const head = useComputed(() => _.get(user, headKey), [props]);
  const name = useComputed(() => _.get(user, nameKey), [props]);

  const haddleError = () => {
    setFailed(true);
  }
  return (
    (head && !failed) ? <Img url={utils._thumb(head, 80)} s={`_rm_${size}`} onError={haddleError}></Img> :
      name ? <Div s={`_rm_${size}_d3d3d3 _fx_rc _fs_16_bold`}>{name[0]}</Div> :
        <Img url={_imgc('common/defaultHead.png')} s={`_rm_${size}`}></Img>
  )
}
