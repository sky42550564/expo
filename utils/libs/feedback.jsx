import { View, TextInput } from 'react-native';

export function $alert(msg, options) { // 提示信息
	return new Promise(resolve => {
		router.refs.message.show({
			confirmText: _.get(options, 'confirmText', '确定'),
			content: msg,
			onConfirm: () => resolve(),
		});
	});
}
export function $confirm(msg, options) { // 确认信息
	return new Promise(resolve => {
		router.refs.message.show({
			confirmText: _.get(options, 'confirmText', '确定'),
			cancelText: _.get(options, 'cancelText', '取消'),
			content: msg,
			onCancel: () => resolve(),
			onConfirm: () => resolve(true),
		});
	});
}
export function $prompt(msg, value = '') { // 输入信息
	return new Promise(resolve => {
		router.refs.message.show({
			content: (
				<View>
					<TextInput
						style={_u(`_s_280_40 _p_10_4 _bc_white`)}
						defaultValue={value}
						placeholderTextColor='#aaaaaa'
						underlineColorAndroid='transparent'
						placeholder={`请输入${msg}`}
						onChangeText={(text) => { value = text; }}
					/>
				</View>
			),
			onCancel: () => resolve(),
			onConfirm: () => resolve({ value }),
		});
	});
}
export function $success(msg) { // 显示成功的消息
	console.log('=================msg', msg);
}
export function $error(msg) { // 显示错误的消息
	console.log('=================msg', msg);
}
