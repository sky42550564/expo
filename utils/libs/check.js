import _ from 'lodash';
export function checkIdNo(idNo = '') {
  const number = idNo.split('');
  const W = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];// 加权因子
  const ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];// 身份证验证位值.10代表X
  if (!number || number.length !== 18) {
    return false;
  }
  if (number[17] === 'x' || number[17] === 'X') {
    number[17] = 10;
  }
  let sum = 0;
  for (let i = 0; i < 17; i++) {
    sum += W[i] * number[i];
  }
  if (number[17] != ValideCode[sum % 11]) {
    console.log(`[checkIdNo]: ${idNo} last number should be ${ValideCode[sum % 11]}`);
  }
  return number[17] == ValideCode[sum % 11];
}
export function checkDate(date = '') {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
}
export function checkPlateNo(code) {
  return /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]?[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/.test(code);
}
export function checkPhone(phone) {
  return /^1\d{10}$/.test(phone);
}
export function checkContactPhone(phone) {
  return /^(0\d{2}-?\d{8}(-?\d{1,4})?)|(0\d{3}-?\d{7,8}(-?\d{1,4})?)$/.test(phone);
}
export function checkSeatPhone(phone) {
  return /^0\d{2,3}-\d{7,8}$/.test(phone);
}
export function checkPhoneList(list) {
  const phoneList = _.reject(_.map(list.split(/;|；/), m => m.trim()), o => !o.length);
  if (phoneList.length && !_.every(phoneList, o => this.checkPhone(o) || this.checkSeatPhone(o))) {
    return false;
  } else {
    return true;
  }
}
export function checkPassword(pwd) {
  return /^[\d\w_]{6,20}$/.test(pwd);
}
export function checkVerificationCode(code) {
  return /^\d{6}$/.test(code);
}
export function checkMailAddress(code) {
  const reg = /^([a-zA-Z0-9]+[_.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  return reg.test(code);
}
export function checkPostNumber(number) {
  const reg = /^[1-9]\d{5}(?!\d)$/;
  return reg.test(number);
}
export function checkName(name) { // 2-4个汉字
  return /^[\u4E00-\u9FA5]{2,4}$/.test(name);
}
export function checkBankCardCode(code) {
  return /^(\d{16}|\d{19})$/.test(code);
}
