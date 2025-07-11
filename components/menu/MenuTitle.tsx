type Props = {
  title: string, // 标题
  titleStyle: string, // 标题样式
  subTitle: string, // 副标题
  subStyle: string, // 副标题样式
  arrowCount: number, // 剪头的个数
  onClick: any, // 点击事件 和 page 二选一
  page: any, // 跳转的页面
  passProps: any, // 跳转的页面参数
};

export default ({
  title, // 标题
  titleStyle, // 标题样式
  subTitle, // 副标题
  subStyle, // 副标题样式
  arrowCount = 1, // 剪头的个数
  onClick, // 点击事件 和 page 二选一
  page, // 跳转的页面
  passProps, // 跳转的页面参数
}: Props) => {
  const showPage = () => {
    if (page) router.push(page, passProps);
    else onClick && onClick();
  }

  return (
    <Div style={_u(`_fx_rb`)}>
      <Div style={_u(titleStyle || `_fs_16_bold`)}>{title}</Div>
      <Div style={_u(`_fx_rc`)} onPress={() => showPage()}>
        {subTitle && <Div style={_u(subStyle || `_fs_14_#bcbcbc`)}>{subTitle}</Div>}
        {
          _.times(arrowCount).map((o: any, i: number) => (
            <Div key={i} style={_u(`_arrow_3_#bcbcbc`)} />
          ))
        }
      </Div>
    </Div>
  );
}
