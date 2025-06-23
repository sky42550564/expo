import { customAlphabet } from 'nanoid/non-secure';
const nanoid = customAlphabet('1234567890abcdef', 24);
import _ from './lodash';

export function log(...params) {
  console.log("debug[================]:", ...params);
}
export function show(...params) { // 在vue中打印
  return params.map(o => o + '').join(' ');
}
export function noop() {
}
// 元转分
export function _F(yuan) {
  return Math.round(yuan * 100);
}
// 分转元
export function _Y(fen) {
  return fen / 100;
}
// 返回字符串
export function _N(num = 0, rank = 2) {
  const rate = Math.pow(10, rank);
  return (Math.round(num * rate) / rate).toFixed(rank);
}
// 返回数字
export function _NI(num, rank) {
  return _N(num, rank) * 1;
}
export function _I(num) {
  if (num == undefined) {
    return undefined;
  }
  return +num;
}
export function _T(id) {
  if (_.isNil(id)) {
    return undefined;
  }
  if (_.isArray(id)) {
    return _.map(id, String);
  }
  return String(id);
}
export function _r(reg) {
  return new RegExp(reg);
}
export function _money(price = 0) {
  price = _N(price / 100, 2);
  return toThousands(price.slice(0, -3)) + price.slice(-3);
}
export function _thumb(url, width = 200) {
  if (!url) return url;
  if (_.isArray(url)) {
    return url.map(o => _thumb(o, width));
  }
  return url.startsWith("blob:") || `${url}?width=${width}`;
}
export function _name(user = {}, defaultValue = '') {
  if (!user.phone) {
    return user.name || defaultValue;
  }
  return `${user.name || defaultValue}(${user.phone})`;
}
export function _date(time = '') {
  return time.slice(0, 10);
}
export function uuid() {
  return nanoid();
}
export function ceil(n) {
  const m = Math.ceil(n - 1);
  return (n - m <= 0.000001) ? m : m + 1;
}
export function floor(n) {
  const m = Math.floor(n + 1);
  return (m - n <= 0.000001) ? m : m - 1;
}
export function formatObject(obj, callback) {
  callback(obj);
  return obj;
}
// 将数字转化为中文
export function _C(num) {
  var arr1 = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  var arr2 = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿'];// 可继续追加更高位转换值
  if (!num || isNaN(num)) {
    return '零';
  }
  var english = num.toString().split('');
  var result = '';
  for (var i = 0; i < english.length; i++) {
    var des_i = english.length - 1 - i;// 倒序排列设值
    result = arr2[i] + result;
    var arr1_index = english[des_i];
    result = arr1[arr1_index] + result;
  }
  // 将【零千、零百】换成【零】【十零】换成【十】
  result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十');
  // 合并中间多个零为一个零
  result = result.replace(/零+/g, '零');
  // 将【零亿】换成【亿】【零万】换成【万】
  result = result.replace(/零亿/g, '亿').replace(/零万/g, '万');
  // 将【亿万】换成【亿】
  result = result.replace(/亿万/g, '亿');
  // 移除末尾的零
  result = result.replace(/零+$/, '');
  // 将【零一十】换成【零十】
  // result = result.replace(/零一十/g,'零十');//貌似正规读法是零一十
  // 将【一十】换成【十】
  result = result.replace(/^一十/g, '十');
  return result;
}
export function visible(visibleValue, params, defaultValue = true) { // 判断是否显示，如果为false，不显示，如果是函数，用返回值判断，否则就显示
  if (_.isFunction(visibleValue)) return !!visibleValue(params);
  if (visibleValue !== undefined) return !!visibleValue;
  return defaultValue;
}
export function value(valueValue, params) { // 如果是函数，用返回值，否则直接返回变量
  if (valueValue && _.isFunction(valueValue)) {
    return valueValue(params);
  }
  return valueValue;
}
export function omitNil(obj) {
  return _.omitBy(obj, o => _.isNil(o) || _.isNaN(o));
}
export function omitEmpty(obj) {
  return _.omitBy(obj, o => _.isNil(o) || _.isNaN(o) || o === '');
}
export function ifNil(obj, defaultValue) {
  return _.isNil(obj) ? defaultValue : obj;
}
export function extname(filePath) {
  const filename = _.last(filePath.split(/\/|\\/));
  const list = filename.split('.');
  return list.length > 1 ? `.${_.last(list)}` : '';
}
export function getSameString(str, str1) {
  let i = 0;
  while (str[i] && str[i] === str1[i]) {
    i++;
  }
  return { head: str.substr(0, i), tail: str.substr(i) };
}
export function findSameString(list, str) {
  if (!str) {
    return undefined;
  }
  for (const str1 of list) {
    if (getSameString(str, str1).head) {
      return str1;
    }
  }
}
export function filterSameString(list, str) {
  const _list = [];
  for (const str1 of list) {
    if (getSameString(str, str1).head) {
      _list.push(str1);
    }
  }
  return _list;
}
export function getMd5(text) {
  const hash = crypto.createHash('md5');
  hash.update(text);
  return hash.digest('hex');
}
export function filterOrginParams(originData, param) {
  const newParam = {};
  for (const key in param) {
    if (param[key] instanceof Array) {
      if (!(_.difference(originData[key], param[key]).length === 0 && originData[key].length === param[key].length)) {
        newParam[key] = param[key];
      }
    } else if (originData[key] != param[key]) {
      newParam[key] = param[key];
    }
  }
  return _.omitBy(newParam, o => _.isNil(o) || o === '');
}
// 通过生日来获取年龄
export function getAgeFromBirthday(birthday, defaultValue) {
  return birthday && /^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})?$/.test(birthday) ? moment().diff(moment(birthday), 'y') : defaultValue;
}
// 通过身份证号获取生日
export function getBirthdayFromIdNo(idNo) {
  return idNo && moment(idNo.substr(6, 8), 'YYYYMMDD');
}
// 通过身份证号获取性别 0:男 1:女
export function getSexFromIdNo(idNo) {
  return idNo && idNo.substr(16, 1) % 2 === 1 ? 0 : 1;
}
// 格式化价格
export function formatFee(fee) {
  return Math.round(fee * 100) / 100;
}
// 睡眠ms毫秒
export function sleep(ms) {
  return new Promise(resolve => { setTimeout(resolve, ms); });
}
// 直到才
// await until(()=>test)
// await until(()=>test, 10)
// until(()=>test, done, 10)
export async function until(test, callback, ms = 100) {
  if (_.isNumber(callback)) {
    ms = callback;
    callback = null;
  }
  while (!test()) {
    await sleep(ms);
  }
  callback && callback();
}
// 获取字符串的真实宽度，一个汉字宽度为2
export function getTrueLength(text = '') {
  let realLength = 0, len = text.length, charCode = -1;
  for (let i = 0; i < len; i++) {
    charCode = text.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128) {
      realLength += 1;
    } else {
      realLength += 2;
    }
  }
  return realLength;
}
// limitStr('请你去123456789', 12) -> '请你去123...'
export function limitStr(text = '', n, append = '...') {
  let realLength = 0, len = text.length, preLen = -1, charCode = -1, needCut = false, appendLen = append.length;
  for (let i = 0; i < len; i++) {
    charCode = text.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128) {
      realLength += 1;
    } else {
      realLength += 2;
    }
    if (preLen === -1 && realLength >= n) {
      preLen = i + 1;
    } else if (realLength > n + appendLen) {
      needCut = true;
      break;
    }
  }
  if (needCut) {
    text = text.substr(0, preLen) + append;
  }
  return text;
}
export function getSize(number) {
  if (number < 1024) {
    return _N(number) + 'B';
  } else if (number < 1024 * 1024) {
    return _N(number / 1024) + 'KB';
  } else {
    return _N(number / (1024 * 1024)) + 'MB';
  }
}
export function parseJSON(str, defaultValue) {
  if (!str) return defaultValue;
  try {
    return JSON.parse(str);
  } catch (e) {
    console.log('json parse error:', e.message);
    return defaultValue;
  }
}
export function evalCode(str) {
  try {
    return { value: (new Function(`return ${str}`))() };
  } catch (e) {
    console.log('eval error:', e.message);
    return { error: true, message: e.message || '格式错误' };
  }
}
/*
function :直接返回为函数
字符串：
'=>123' :返回 123，可以使用 $, _, moment 等符号
'=$123' :返回 input123 其中 $ 代表当前参数，直接替换
'return 123' :与 '=>123'相同，返回 123，可以使用 $, _, moment 等符号
'({$, _, moment})=>123' :返回 123
其他： 直接返回字符串
*/
export function parseFunction(func, sync) {
  if (_.isString(func)) {
    const _func = func.trim();
    if (/^=>/.test(_func)) {
      return (new Function(`return ${sync ? '' : 'async'}({ $, _, moment } = {})${_func}`))();
    } else if (/^=/.test(_func)) {
      return (new Function(`return ${sync ? '' : 'async'}({ $, _, moment } = {})=>'${_func.slice(1)}'.replace(/\\$/g, $)`))();
    } else if (/=>/.test(_func)) {
      return (new Function(`return ${_func}`))();
    } else if (/^return /.test(_func)) {
      return (new Function(`return ${sync ? '' : 'async'}({ $, _, moment } = {})=>{ ${_func} }`))();
    }
  }
  return func;
}
export function toThousands(num) {
  return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}
export function getPercentages(list) {
  const sum = _.sum(list);
  return list.map((v) => Math.round(v * 100 / sum) + '%');
}
export function numberParser(precision) {
  return (v) => {
    v = v.replace(/[^\d-.]+/g, '');
    const reg = /([^.]*)\.(.*)/;
    const m = v.match(reg);
    if (!m) {
      return v;
    }
    return m[1] + '.' + (m[2].replace(/\./g, '').slice(0, precision));
  };
}
export function formatPhoneList(phoneList = '', phone = '') {
  phoneList = phone + ';' + phoneList.replace('；', ';');
  phoneList = _.uniq(_.filter(_.map(phoneList.split(';'), m => m.trim()), o => !!o));
  return phoneList.join(';');
}
export function encodeURIParams(data) {
  const list = [];
  for (const key in data) {
    list.push(`${key}=${data[key]}`);
  }
  return list.join('&');
}
export function urlParam(obj, key) {
  if (typeof obj !== 'object') {
    return encodeURI(`${key}=${obj}`);
  } else {
    obj = _.omitBy(obj, o => _.isNil(o));
  }
  const list = [];
  for (let i in obj) {
    const v = obj[i];
    const j = key ? `${key}[${i}]` : i;
    if (v instanceof Array) {
      for (let k in v) {
        list.push(urlParam(v[k], `${j}[${k}]`));
      }
    } else {
      list.push(urlParam(v, j));
    }
  }
  return list.join('&');
}
function pareUrlParam(search) {
  const params = {};
  search && search.split('&').forEach(o => {
    const split = o.indexOf('=');
    let val, key;
    if (split === -1) {
      key = o;
    } else {
      key = o.substr(0, split);
      val = o.substr(split + 1);
    }
    if (val === undefined) {
      if (key[0] === '!') {
        key = key.slice(1);
        val = false;
      } else {
        val = true;
      }
    } else if (val === 'true') {
      val = true;
    } else if (val === 'false') {
      val = false;
    } else if (/^-?\d+(\.\d+)?$/.test(val)) { // 数字
      val = val * 1;
    } else if (/^'(-?\d+(\.\d+)?)|true|false'$/.test(val)) {
      val = val.replace(/^'|'$/g, '');
    }
    Object.assign(params, { [key]: val });
  });
  return params;
}
export function getWindowLocationSearch() {
  if (typeof window === 'undefined') {
    return {};
  }
  return pareUrlParam(decodeURIComponent(window.location.search.replace(/^[^?]*\?/, '')));
}
export function randomColor() {
  return '#' + ('00000' + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);
}
export function downloadUrl(url, name) {
  const a = document.createElement('a');
  name && (a.download = name);
  a.href = url;
  a.style.display = 'none';
  a.click();
}
function createInput(name, value) {
  const el = document.createElement("input");
  el.type = "hidden";
  el.name = name;
  if (value != null) {
    el.value = value;
  }
  return el;
}
export function postForm(url, data) {
  const form = document.createElement("form");
  form.action = url;
  form.method = "post";
  form.style.display = "none";
  for (let key in data) {
    form.appendChild(createInput(key, data[key]));
  }
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}
export function loadJsCode(code, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  if (typeof callback != "undefined") {
    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState == "loaded" || script.readyState == "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = function () {
        callback();
      };
    }
  }
  script.textContent = code;
  document.body.appendChild(script);
}
export function loadJsCodeSync(code) {
  return new Promise(async (resolve) => {
    loadJsCode(code, function () {
      resolve();
    });
  });
}
// 展示时间格式: xx小时xx分xx秒
export function timeConversion(timelong) {
  if (timelong) {
    const ss = parseInt((timelong % 3600) % 60);
    const mm = parseInt((timelong % 3600) / 60);
    const hh = parseInt(timelong / 3600);
    if (timelong < 60) {
      return (ss + '秒');
    } else if (timelong < 3600) {
      return mm ? (mm + '分' + ss + '秒') : (ss + '秒');
    } else {
      return !ss && !mm ? (hh + '小时') : !ss ? (hh + '小时' + mm + '分') : (hh + '小时' + mm + '分' + ss + '秒');
    }
  } else {
    return ('0秒');
  }
}
// 展示一个过去时间的字符串，当前显示HH:mm格式，昨天的显示昨天，其他的显示M月D日
export function timePoint(time) {
  let now = moment(), date = moment(time);
  if (now.isSame(date, 'day')) {
    return date.format('HH:mm');
  } else if (now.startOf('day').diff(moment(time).startOf('day'), 'day') == 1) {
    return date.format('昨天');
  }
  return date.format('M月D日');
}
// 获取一个时间的段的mongodb的判断值: { $gte: '2024-01-01', $lt: '2024-02-01' }
export function timeBetween(time, type = 'd') {
  const start = moment(time).startOf(type), end = moment(time).startOf(type).add(1, type);
  return { $gte: start.ts(), $lt: end.ts() };
}
//rgba(31,147,255,0.73)
//rgb(31,147,255)
export function rgbaToHex(rgba) {
  var list = rgba.replace(/\s*/g, '').match(/rgba?\((\d+),(\d+),(\d+),?(.*)?\)/);
  if (list) {
    return `#${(+list[1]).toString(16).padStart(2, '0')}${(+list[2]).toString(16).padStart(2, '0')}${(+list[3]).toString(16).padStart(2, '0')}${((list[4] || 1) * 100).toString(16).padStart(2, '0')}`.toUpperCase();
  }
  return '';
}
//#1F93FF49
export function hexToRgba(hex) {
  const list = hex.match(/#(..)(..)(..)(..)?/);
  if (list) {
    return `rgba(${parseInt(list[1], 16)},${parseInt(list[2], 16)},${parseInt(list[3], 16)},${parseInt(list[4] || '64', 16) / 100})`;
  }
  return '';
}
//#1F93FF49
export function hexToList(hex) {
  const list = hex.match(/#(..)(..)(..)(..)?/);
  if (list) {
    return [parseInt(list[1], 16), parseInt(list[2], 16), parseInt(list[3], 16), list[4] ? parseInt(list[4], 16) : 255];
  }
  return '';
}
export function json_stringify(obj, pretty) {
  const str = JSON.stringify(obj, (key, value) => {
    if (_.includes(['hash', 'salt', '__v'], key)) {
      return undefined;
    }
    if (value instanceof Array && _.every(value, o => +o == o)) {
      return `__$__${JSON.stringify(value)}__$__`;
    }
    return value;
  }, pretty ? 2 : 0);
  return str.replace(/"__\$__\[/g, '[').replace(/]__\$__"/g, ']').replace(/\\"/g, '"');
}
// type: 0: js 1: json 2:inline-js 3:inline-json
export function stringify(obj, type = 0, pad = 2, space = ' ', bk = os.EOL, level = 0) {
  if (type === 2) {
    return stringify(obj, 0, 0, '', '');
  }
  if (type === 3) {
    return JSON.stringify(obj);
  }
  const keyAuot = type === 0 ? `` : `"`;
  const valueAuot = type === 0 ? `'` : `"`;
  if (_.isPlainObject(obj)) {
    const line = [`{`];
    const keys = _.keys(obj);
    for (const i in keys) {
      line.push(`${_.repeat(space, (level + 1) * pad)}${keyAuot}${keys[i]}${keyAuot}: ${stringify(obj[keys[i]], type, pad, space, bk, level + 1)}${i == keys.length - 1 ? '' : ','}`);
    }
    line.push(`${_.repeat(space, level * pad)}}`);
    return line.join(bk);
  } else if (_.isArray(obj)) {
    const line = [];
    for (const o of obj) {
      if (!_.isPlainObject(o) && !_.isArray(o)) {
        line.push(_.isString(o) ? `${valueAuot}${_r(valueAuot).test(o) ? o.trim().replace(_r(valueAuot, 'g'), `\\${valueAuot}`) : o.trim()}${valueAuot}` : `${o}`);
      } else {
        line.push(`${stringify(o, type, pad, space, bk, level)}`);
      }
    }
    return `[${line.join(', ')}]`;
  } else if (_.isString(obj)) {
    return `${valueAuot}${obj.trim()}${valueAuot}`;
  }
  return obj;
}
export function stringifyWeb(obj, type = 0, pad = 2) {
  return stringify(obj, type, pad, '&nbsp', '<br>');
}
// 计算两个location之间的距离
export function calDistance(lat1, lng1, lat2, lng2, { unit = 'km', precision = 0 } = {}) {
  const EARTH_RADIUS = 6378.137;// 地球半径
  const radLat1 = lat1 * Math.PI / 180.0; //lat1 * Math.PI / 180.0=>弧度计算
  const radLat2 = lat2 * Math.PI / 180.0;
  const a = radLat1 - radLat2;
  const b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
  const s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  if (unit == 'm') {
    return _N(s * EARTH_RADIUS * 1000, precision);
  }
  return _N(s * EARTH_RADIUS, precision);
}
export function calDistanceByLocation(loc1, loc2, options) {
  if (!loc1 || !loc2) {
    return 9999;
  }
  return calDistance(loc1.latitude, loc1.longitude, loc2.latitude, loc2.longitude, options);
}
export const getFileSize = (size) => {
  if (!size)
    return "";
  const num = 1024.00; //byte
  if (size < num)
    return size + "B";
  if (size < Math.pow(num, 2))
    return (size / num).toFixed(2) + "K"; //kb
  if (size < Math.pow(num, 3))
    return (size / Math.pow(num, 2)).toFixed(2) + "M"; //M
  if (size < Math.pow(num, 4))
    return (size / Math.pow(num, 3)).toFixed(2) + "G"; //G
  return (size / Math.pow(num, 4)).toFixed(2) + "T"; //T
}
/*
* let id = __time()
* __time(id, true)
* __time(id)
*/
const timeContainer = { id: 0 };
export function __time(id, isCountinue) {
  if (id === undefined) {
    const _id = timeContainer.id++;
    timeContainer[_id] = Date.now();
    console.log(`[${_id}][start]`);
    return _id;
  } else {
    const startTime = timeContainer[id];
    !isCountinue && delete timeContainer[id];
    console.log(`[${id}][end]:`, Date.now() - startTime);
  }
}
