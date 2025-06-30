import { View } from 'react-native';
import { Form } from '@ant-design/react-native';
import * as ImagePicker from 'expo-image-picker';

const FormCell = ({
  count = 1, // 最多上传图片数量
  disabled = false, // 是否禁用
  width, // 宽度
  height, // 高度
  value, // antd的Form.Item自动传下来的值
  onChange, // antd的Form.Item自动传下来的回调
}: any) => {
  const modalPanelRef = useRef(null);
  const [images, setImages] = useState((!value ? [] : (count == 1 ? [value] : value)));

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
    const newImages = list.map((o: any) => 'http://localhost:5188' + o.result.url);
    onImagesChange([...images, ...newImages]);
  }
  const onImagesChange = async (images: any) => {
    setImages(images);
    onChange && onChange(count == 1 ? images[0] : images);
  }
  const privewImage = (url: any) => {
  }

  const deleteImage = (index: any) => {
    images.splice(index, 1);
    onImagesChange([...images]);
  }

  const showActionSheet = () => {
    modalPanelRef.current.show();
  }

  const buttons = [{ label: '从相册选择', callback: openImagePicker }, { label: '拍照', callback: takePhoto }];
  return (
    <View>
      <View style={_u(`_fx_r_wrap`)}>
        {images.map((url: string, index: number) => (
          <Img key={index} url={url} s={`_s_${width}_${height} _por _mh_4 _bo`} onPress={() => privewImage(url)}>
            {!disabled && <Icon s='_poa_t0_r0' icon='MaterialIcons:delete' color='red' size={20} onPress={() => deleteImage(index)}></Icon>}
          </Img>
        ))}
        {(images.length < count && !disabled) && <Icon s={`_s_80 _fx_rc`} icon='AntDesign:plus' color='gray' onPress={showActionSheet}></Icon>}
      </View>
      <ActionPanel ref={modalPanelRef} buttons={buttons}></ActionPanel>
    </View>
  );
};

export default ({
  form, // 整个form
  label, // 标签
  name, // 字段名
  noLabel, // 不显示标签
  required, // 必选
  count = 1, // 图片数量
  width = 80, // 宽度
  height = 80, // 高度
  disabled = false, // 是否禁用
  onChange, // 监听变化时的回调
  model = [], // 双向绑定， [value, setValue] 例如：<FormImageItem label='头像' model={[head, setHead]} />
}: any) => {
  // 验证规则
  const rules = [];
  if (required !== false) { // 默认是必传，只有传false的时候才不是必传
    rules.unshift({ required: true, message: `${label}不能为空` });
  }

  return (
    <Form.Item
      label={noLabel ? null : label}
      name={name}
      rules={rules}
    >
      <FormCell {...{ count, disabled, width, height, value: model[0], onChange: model[1] || onChange }} />
    </Form.Item>
  );
};
