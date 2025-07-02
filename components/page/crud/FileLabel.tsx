type Props = {
  url?: any, // 文件路径
  name?: any, // 文件名称
};

export default (props: Props) => {
  const icon = useComputed(() => {
    const suffix = props.name && props.name.split('.')[1];
    if (_.includes(['doc', 'docx'], suffix)) {
      return _imgc('folder/word.png');
    } else if (_.includes(['xls', 'xlsx'], suffix)) {
      return _imgc('folder/excel.png');
    } else if (_.includes(['png', 'jpg', 'jpeg', 'gif'], suffix)) {
      return props.url;
    } else if (_.includes(['ppt', 'pptx'], suffix)) {
      return _imgc('folder/ppt.png');
    } else if (_.includes(['mp3', 'wma', 'wav', 'midi', 'ape', 'flac'], suffix)) {
      return _imgc('folder/mp3.png');
    } else if (_.includes(['avi', 'AVI', 'mov', 'rmvb', 'rm', 'FLV', 'mp4', '3GP'], suffix)) {
      return _imgc('folder/video.png');
    } else if (_.includes(['rar', 'zip'], suffix)) {
      return _imgc('folder/package.png');
    } else {
      return _imgc('folder/txt.png');
    }
  }, [props]);

  return (
    <Div s='_fx_r'>
      <Img src={icon} s='_s_14 _mr_6' />
      <Div onPress={() => utils.preImageFile(props.url)} s='_fs_12_gray _mv_2'>{props.name}</Div>
    </Div>
  );
}
