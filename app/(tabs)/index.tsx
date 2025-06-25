import { Modal, View, Text, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';
import { useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import Ionicons from '@expo/vector-icons/Ionicons';
import ModalPanel from '@/components/layout/ModalPanel';


export default function Home() {
  const modalPanelRef = useRef(null);
  return (
    <View style={_u(`_mt_50`)}>
      <ModalPanel ref={modalPanelRef}></ModalPanel>
      <View style={_u(`_wf_150 _fx_rcc`)}>
        <Div onPress={() => {
          modalPanelRef.current && (modalPanelRef.current as any).show();
        }} s="_button_white_warning_error_v_335_42_fs21_r _of_hidden">显示</Div>
      </View>
    </View>
  );
}
