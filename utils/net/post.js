import config from '@/config.js';

export function post(url, { $wait, $noLog, ...params } = {}) {
  !$noLog && console.log('[' + url + '] send:', JSON.parse(JSON.stringify(params || {})));
  return new Promise((resolve) => {
    fetch(`${config.server}/api${url}`, {
      method: 'post',
      body: JSON.stringify(params),
      headers: { // 表示我们发送的数据是json的格式
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
        !$noLog && console.log('[' + url + '] recv:', JSON.parse(JSON.stringify(data)));
      })
      .catch((error) => {
        console.log('[error]:', res);
        resolve({ message: '网络错误' }); // 如果返回空，就说明是错误的
      });
  });
}
