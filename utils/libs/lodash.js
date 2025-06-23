import _lodash from 'lodash';

// 数字从min到max循环，参数: [min=1,] max [,step=1]
_lodash.for = function (callback, ...list) {
  let min = 1, max = 0, step = 1;
  if (list.length === 1) {
    max = list[0];
  } else if (list.length === 2) {
    min = list[0];
    max = list[1];
  } else if (list.length === 2) {
    min = list[0];
    max = list[1];
    step = list[2];
  }
  for (let i = min; i <= max; i += step) {
    callback(i);
  }
}
/*
删除一个，区别于_.remove，只删除匹配的第一个
_.removeOne([1,1,2], o=>o==1) => [1] 剩余 [1, 2]
对比remove
_.remove([1,1,2], o=>o==1) => [1, 1] 剩余 [2]
*/
_lodash.removeOne = function (list, iteratee) {
  const index = _.findIndex(list, iteratee);
  if (index === -1) {
    return [];
  }
  const r = list[index];
  list.splice(index, 1);
  return [r];
}
/*
会改变原来的数据
_.removeIndex([1,1,2], 0) => [1,2]
*/
_lodash.removeIndex = function (list, index) {
  list.splice(index, 1);
  return list;
}
/*
集合中的字段的值是否存在
_.has([{a: 1, b: 2}], 'a', 1)
_.has([{a: [1], b: 2}], 'a.0', [1,2])
*/
_lodash.has = function (list, keys, value) {
  return _lodash.isArray(value) ? !!_lodash.find(list, o => value.includes(_lodash.get(o, keys))) : !!_lodash.find(list, o => _lodash.get(o, keys) === value);
}
/*
集合中的字段的key值是否存在
_.key({ a:1 }) -> a
_.key({ a:1, b: 2 }) -> a
_.key({ a:1, b: 2 }, 1) -> b
*/
_lodash.key = function (obj, index = 0) {
  return _lodash.keys(obj)[index];
}
/*
集合中的字段的Value值是否存在
_.key({ a:1 }) -> a
_.key({ a:1, b: 2 }) -> a
_.key({ a:1, b: 2 }, 1) -> b
*/
_lodash.value = function (obj, index = 0) {
  return _lodash.values(obj)[index];
}
/*
获取接口的list
*/
_lodash.list = function (result) {
  return _lodash.get(result, 'result.list', []);
}
// 设置数组某一个的值
// _.findSet(list, o => o.name === 'phone', 'value.disabled', true)
_lodash.findSet = function (list, cond, key, value) {
  _lodash.set(_lodash.find(list, cond), key, value);
}
// 设置数组某一个的多值
// _.findSetObj(list, o => o.name === 'phone', { key: value })
_lodash.findSetObj = function (list, cond, obj) {
  _lodash.assign(_lodash.find(list, cond), obj);
}
// 获取数组某一个的值
// _.findGet(list, o => o.name === 'phone', 'value.disabled')
_lodash.findGet = function (list, cond, key, defaultValue) {
  return _lodash.get(_lodash.find(list, cond), key, defaultValue);
}
// 获取数组某一个的值
// _.mapGet(data, 'result.list', o => o.name, [{ name: 'xx' }])
_lodash.mapGet = function (obj, key, mapKey, defaultValue) {
  return _lodash.map(_lodash.get(obj, key, defaultValue), mapKey);
}
/*
截取字符串，length可以为负数
_.substr('0123456', 2, 2) // '23'
_.substr('0123456', 2) // '23456'
_.substr('0123456', -2) // '56'
_.substr('0123456', 2, -1) // '2345'
*/
_lodash.substr = function (str = '', startpos, length) {
  if (length < 0) {
    return str.substr(startpos, str.length + length - startpos);
  }
  return str.substr(startpos, length);
}
// 交换数组的两个数据
_lodash.swap = function (list, pos1, pos2) {
  const t = list[pos1];
  list[pos1] = list[pos2];
  list[pos2] = t;
}
// 计算符合条件的个数
_lodash.count = function (arr, iteratee) {
  return _lodash.filter(arr, iteratee).length;
}
// 计算两个数组从头相同的个数
_lodash.sameCount = function (arr1, arr2, iteratee) {
  let cnt = 0;
  const n = Math.min(arr1.length, arr2.length);
  for (let i = 0; i < n; i++) {
    const ret = iteratee ? iteratee(arr1[i], arr2[i]) : arr1[i] === arr2[i]; // 如果没有指定iteratee，则位直接比较
    if (ret) {
      cnt++;
    } else {
      return cnt;
    }
  }
  return cnt;
}
// 提取集合中的字段来结合
_lodash.joinBy = function (arr, key, separator = ',') {
  return _lodash.map(arr, key).join(separator);
}
// 排除空值 null 或 undefined
_lodash.omitNil = function (obj) {
  return _lodash.omitBy(obj, _lodash.isNil);
}
// 排除空值后深拷贝
_lodash.cloneDeepOmitNil = function (obj) {
  return _lodash.cloneDeep(_lodash.omitNil(obj));
}
// 追加没有的值
_lodash.uniqPush = function (arr, item) {
  if (!_lodash.includes(arr, item)) {
    arr.push(item);
  }
}
// 全部替换， _.replaceAll('131', '1', '2') -> '232'
_lodash.replaceAll = function (str, from, to) {
  if (str.replaceAll) return str.replaceAll(from, to);
  return str.replace(new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), to);
};
// 替换新的key， _.replaceKey({ a: 1, b: 1 }, 'a', 'aa') -> { aa: 1, b: 1 }
_lodash.replaceKey = function (obj, oldKey, newKey) {
  if (obj) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }
  return obj;
};
// 比较数组是否相同，个数和值都相同，顺序可以不一样 m == n
_lodash.isArrayEqual = function (m = [], n = []) {
  return _lodash.isEqual(_lodash.sortBy(m), _lodash.sortBy(n));
}
// m 包含 n
_lodash.isContain = function (m = [], n = []) {
  return _lodash.difference(n, m).length === 0;
}
// m 真包含 n
_lodash.isTrueContain = function (m = [], n = []) {
  return _lodash.difference(n, m).length === 0 && m.length > n.length;
}
// _.in(1, [1, 2, 3])
// _.in(1, 1, 2, 3)
_lodash.in = function (v, ...l) {
  if (_lodash.isArray(l[0])) l = l[0];
  return _lodash.includes(l, v);
}
// _.nin(1, [1, 2, 3])
// _.nin(1, 1, 2, 3)
_lodash.nin = function (v, ...l) {
  if (_lodash.isArray(l[0])) l = l[0];
  return !_lodash.includes(l, v);
}
// 给对象的空值属性设置默认值
_lodash.ifNullKey = function (obj, key, value) {
  if (_lodash.isNil(obj[key])) {
    obj[key] = value;
  }
  return obj;
}
// 空值设置默认值
_lodash.ifNull = function (v, defaultValue) {
  return _lodash.isNil(v) ? defaultValue : v;
}
/*
通过相同的key值相加两个集合
_.addArrayValueByKey([ {key: 'a', value: 1}, {key: 'b', value: 1} ], [ {key: 'a', value: 1}, {key: 'c', value: 1} ]) -> [ {key: 'a', value: 2}, {key: 'b', value: 1}, {key: 'c', value: 1} ]
*/
_lodash.addArrayValueByKey = function (m, n, keyName = 'key', valueName = 'value') {
  m = m || [];
  n = n || [];
  const list = [];
  for (const o of m) {
    const keyValue = o[keyName];
    const item = _lodash.find(n, p => p[keyName] === keyValue);
    if (item) {
      n = _lodash.reject(n, p => p[keyName] === keyValue);
      list.push({ [keyName]: keyValue, [valueName]: o[valueName] + item[valueName] });
    } else {
      list.push(o);
    }
  }
  return list.concat(n);
}
/*
对连个object的数值相加
_.addObjectValue({a: 1, c: 1}, {a: 1, b: 1}) -> {a: 2, b: 1, c: 1}
*/
_lodash.addObjectValue = function (m, n) {
  m = m || {};
  n = n || {};
  const obj = {};
  for (const key in m) {
    obj[key] = (m[key] || 0) + (n[key] || 0);
    if (n[key] != undefined) {
      n = _lodash.omit(n, key);
    }
  }
  return { ...obj, ...n };
}
// 去除空值
_lodash.omitNil = function (obj) {
  return _lodash.omitBy(obj, o => _lodash.isNil(o) || _lodash.isNaN(o));
}
// 去除Boolean
_lodash.omitBool = function (obj) {
  return _lodash.omitBy(obj, o => !o);
}
// 去除空值包括空字符
_lodash.omitEmpty = function (obj) {
  return _lodash.omitBy(obj, o => _lodash.isNil(o) || _lodash.isNaN(o) || o === '');
}
// 如果是空值就返回默认值
export function ifNil(obj, defaultValue) {
  return _lodash.isNil(obj) ? defaultValue : obj;
}
// 获取集合的最大值数值
_lodash.maxValue = function (list, key, defaultValue) {
  return _lodash.get(_lodash.maxBy(list, key), key, defaultValue);
}
// 获取集合的最大值数值所在的index，key可以为空，为空时直接比较值如[1,2,3,4]
// _.maxValueIndex([1,3,2]) => 1
// _.maxValueIndex([{a:1},{a:3},{a:2}], 'a') => 1
_lodash.maxValueIndex = function (list, key) {
  const maxValue = _lodash.maxBy(list, key);
  return _lodash.findIndex(list, o => key ? _lodash.get(o, key) === _lodash.get(maxValue, key) : o === maxValue);
}
// 获取集合的最小值数值
_lodash.minValue = function (list, key, defaultValue) {
  return _lodash.get(_lodash.minBy(list, key), key, defaultValue);
}
// 获取集合的最小值数值所在的index，key可以为空，为空时直接比较值如[1,2,3,4]
// _.minValueIndex([1,0,2]) => 1
// _.minValueIndex([{a:1},{a:0},{a:2}], 'a') => 1
_lodash.minValueIndex = function (list, key) {
  const minValue = _lodash.minBy(list, key);
  return _lodash.findIndex(list, o => key ? _lodash.get(o, key) === _lodash.get(minValue, key) : o === minValue);
}
// 获取集合的最后值数值
_lodash.lastValue = function (list, key, defaultValue) {
  return _lodash.get(_lodash.last(list), key, defaultValue);
}
// 将一个数组扩充为一个大的数组，并打乱顺序（主要用作测试用）
_lodash.grow = function (list, length) {
  if (!list.length) { // 数组为空的时候返回空
    return list;
  }
  const n = Math.ceil(length / list.length);
  let _list = [];
  _lodash.for(() => { _list = _list.concat(list) }, n); // 循环n次
  return _lodash.shuffle(_list);
}
// 判断是否是异步函数或者Promise
_lodash.isAsyncFunction = function (func) {
  const name = _.get(func, 'constructor.name');
  return name === 'AsyncFunction' || name === 'Promise';
}
export default _lodash;
