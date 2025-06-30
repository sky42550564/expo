import config from '@/config.js';

export function upload({ filePath, file }) {
	return new Promise(async resolve => {
		const url = `${config.server}/api/upload`;
		const formData = new FormData();
		if (filePath) {
			const fileName = filePath.split('/').pop();
			const fileType = fileName?.split('.').pop() || 'jpg';
			formData.append('file', { uri: filePath, name: fileName, type: `image/${fileType}` });
		} else { // h5的情况
			formData.append('file', file);
		}
		fetch(url, {
			method: 'post',
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => {
				resolve(data);
			})
			.catch((error) => {
				console.log('[error]:', error);
				resolve({ message: '上传文件失败' });
			});
	});
}
