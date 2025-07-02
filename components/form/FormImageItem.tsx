import config from '@/config';
import * as ImagePicker from 'expo-image-picker';

export default ({
  form, // form
  prop, // 字段名
  label, // 标签
  labelLeft, // 标签的左边宽度
  labelWidth, // 标签的宽度
  labelRight, // 标签的右边宽度
  noLabel, // 不显示标签
  required, // 必选
  disabled = false, // 是否禁用
  count = 1, // 图片数量
  width = 80, // 宽度
  height = 80, // 高度
  onChange, // 监听变化时的回调
}: any) => {
  // 验证规则
  const rules = [];
  if (required !== false) { // 默认是必传，只有传false的时候才不是必传
    rules.unshift({ required: true, message: `${label}不能为空` });
  }

  const modalPanelRef = useRef(null);
  const [images, setImages] = useState((!form.data[prop] ? [] : (count == 1 ? [form.data[prop]] : form.data[prop])));

  // 打开图片选择器（使用 Expo 的 ImagePicker）
  const openImagePicker = async () => {
    modalPanelRef.current.close();
    // 申请媒体库权限
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return $error('需要媒体库权限才能选择图片');

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!result.canceled) {
      uploadImages(result.assets);
    }
  };

  // 拍照
  const takePhoto = async () => {
    modalPanelRef.current.close();
    // 申请相机权限
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') return $error('需要相机权限才能拍照');

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!result.canceled) {
      uploadImages(result.assets);
    }
  };

  const uploadImages = async (assets: any) => {
    const list = sr.h5 ? await Promise.all(assets.map((o: any) => utils.upload({ file: o.file }))) : await Promise.all(assets.map((o: any) => utils.upload({ filePath: o.uri })));
    if (_.some(list, (o: any) => !o.success)) {
      return $alert('上传图片失败');
    }
    const newImages = list.map((o: any) => config.server + o.result.url);
    onImagesChange([...images, ...newImages]);
  }

  const deleteImage = (index: any) => {
    images.splice(index, 1);
    onImagesChange([...images]);
  }

  const showActionSheet = () => {
    modalPanelRef.current.show();
  }

  const privewImage = (url: any) => {
  }

  const onImagesChange = async (images: any) => {
    setImages(images);
    const value = count == 1 ? images[0] : images;
    onChange && onChange(value);
    form.set(prop, value);
  }

  const buttons = [{ label: '从相册选择', callback: openImagePicker }, { label: '拍照', callback: takePhoto }];

  return (
    <FormLabel {...{ form, prop, label, labelLeft, labelWidth, labelRight, noLabel, rules, required, disabled }}>
      <Div>
        <Div s='_fx_r_wrap'>
          {images.map((url: string, index: number) => (
            <Img key={index} url={url} s={`_s_${width}_${height} _por _mh_4 _bo`} onPress={() => privewImage(url)}>
              {!disabled && <Icon s='_poa_t0_r0' icon='MaterialIcons:delete' color='red' size={20} onPress={() => deleteImage(index)}></Icon>}
            </Img>
          ))}
          {(images.length < count && !disabled) && <Icon s={`_s_80 _fx_rc`} icon='AntDesign:plus' color='gray' onPress={showActionSheet}></Icon>}
        </Div>
        <ActionPanel ref={modalPanelRef} buttons={buttons}></ActionPanel>
      </Div>
    </FormLabel>
  );
};
