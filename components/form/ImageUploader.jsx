import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// 图片上传组件 - 可直接用于 Form.Item 中
const ImageUploader = ({
  form, // Form 实例
  name, // 表单字段名
  maxCount = 1, // 最多上传图片数量
}) => {
  const modalPanelRef = useRef(null);
  const [images, setImages] = useState([]);

  // 表单值变化时更新组件状态
  React.useEffect(() => {
    setImages(form.getFieldValue(name) || []);
  }, [form, name]);

  // 表单提交时更新表单值
  React.useEffect(() => {
    form.setFieldsValue({
      [name]: images,
    });
  }, [images, form, name]);

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
      setImages([...images, ...result.assets.map(o => o.uri)]);
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
      console.log('=================', result.assets.map(o => o.uri));
      setImages([...images, ...result.assets.map(o => o.uri)]);
    }
  };

  const privewImage = (url) => {
    console.log('=================url', url);
  }

  const deleteImage = (index) => {
    images.splice(index, 1);
    setImages([...images]);
  }

  const showActionSheet = () => {
    modalPanelRef.current.show();
  }
  const buttons = [{ label: '从相册选择', callback: openImagePicker }, { label: '拍照', callback: takePhoto }];

  return (
    <View>
      <View style={_u(`_fx_r_wrap`)}>
        {images.map((url, index) => (
          <Img key={index} url={url} s='_s_80 _por _mh_4 _bo' onPress={() => privewImage(url)}>
            <Icon s='_poa_t0_r0' icon='MaterialIcons:delete' color='red' size={20} onPress={() => deleteImage(index)}></Icon>
          </Img>
        ))}
        {images.length < maxCount && <Icon s={`_s_80 _fx_rc`} icon='AntDesign:plus' color='gray' onPress={showActionSheet}></Icon>}
      </View>
      <ActionPanel ref={modalPanelRef} buttons={buttons}></ActionPanel>
    </View>
  );
};

export default ImageUploader;
