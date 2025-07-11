import { Modal, View, Text, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';
import { useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import Ionicons from '@expo/vector-icons/Ionicons';
import ModalPanel from '@/components/layout/ModalPanel';
import ActionPanel from '@/components/layout/ActionPanel';

export default function Home() {
  const modalPanelRef = useRef(null);
  const show = async () => { // 
    // (modalPanelRef.current as any).show();
    // (modalPanelRef.current as any).show({  onCancel: true });
    // router.refs.message.show({ content: <View><Text>方运江</Text></View>});
    // router.refs.message.show({ content: '方运江'});
    // router.refs.toast.show({ message: '方运江'});
    // const applyReason = await $prompt('留言');
    // console.log('=================123', applyReason);
    //  await $alert('留言xx');
    //   await $prompt('留言');
    // await lc.setObject('fang', { a: { b: 1 } });
    // const x = await lc.getObject('fang');
    // console.log('=================x', x);
  }
  return (
    <View style={_u(`_mt_50`)}>
      {/* <ModalPanel ref={modalPanelRef}><Text>dhfskdfh</Text></ModalPanel> */}
      <ActionPanel ref={modalPanelRef} buttons={[{ label: '打开相机' }, { label: '开始拍照' }]}></ActionPanel>
      <View style={_u(`_wf_150 _fx_rc`)}>
        <Div onPress={show} s="_button_white_warning_error_v_335_42_fs21_r _of_hidden">显示</Div>
      </View>
    </View>
  );
}
