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
    // modalPanelRef.current && (modalPanelRef.current as any).show({ title: '提示xx', position: 'middle' });
    // (modalPanelRef.current as any).show({  onCancel: true });
    // router.refs.messageBox.show({ content: <View><Text>方运江</Text></View>});
    // router.refs.messageBox.show({ content: '方运江'});
    const applyReason = await $prompt('留言');
    console.log('=================123', applyReason);
  }
  return (
    <View style={_u(`_mt_50`)}>
      {/* <ModalPanel ref={modalPanelRef}><Text>dhfskdfh</Text></ModalPanel> */}
      <ActionPanel ref={modalPanelRef} buttons={[{label: '打开相机'},{label: '开始拍照'}]}></ActionPanel>
      <View style={_u(`_wf_150 _fx_rcc`)}>
        <Div onPress={show} s="_button_white_warning_error_v_335_42_fs21_r _of_hidden">显示</Div>
      </View>
    </View>
  );
}
