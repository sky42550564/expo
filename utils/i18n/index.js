import config from '@/config.js';
import en from './en.js'; // 英文
const languages = {
  en,
};

// '方运江': 'fangyunjiang',
// 有重复的情况，可以使用 # + 数字进行区分，但是简体汉语不变， 如：'方运江#1': 'Fang Yunjiang',
// 如果需要显示#，需要使用\转义， 如：'方运江\\#1'
export default function _t(word) {
  const lang = languages[config.language];
  if (lang) {
    const ret = lang[word];
    if (ret) return ret;
  }
  // 有重复的情况，可以使用 # + 数字进行区分，但是简体汉语不变
  return word.split('\\#').map(o => o.split('#')[0]).join('#');
}
