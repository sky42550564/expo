import type { PropsWithChildren } from 'react';
import { useState, forwardRef, useImperativeHandle } from 'react';
import type { GestureResponderEvent } from 'react-native';
import { Modal, View, Text, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = PropsWithChildren<{
  onPress?: (event: GestureResponderEvent) => void; // 点击事件
}>;

export default forwardRef(({
  children,
}: Props, ref) => {
  const [visible, setVisible] = useState(false);
  const show = () => {
    setVisible(true);
  }
  const close = () => {
    setVisible(false);
  }

  useImperativeHandle(ref, () => ({ show, close })); // 暴露函数组件内部方法
  return (
    <Modal animationType="fade" transparent statusBarTranslucent visible={visible}>
      <View style={_u(`_full _bc_#00000088`)}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Hello World!</Text>

          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
            onPress={() => {
              setVisible(!visible);
            }}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
});
const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
