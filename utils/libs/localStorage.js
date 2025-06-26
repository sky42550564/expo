import AsyncStorage from '@react-native-async-storage/async-storage';

export default {
  async getNumber(key, defaultValue = 0) {
    let ret = await AsyncStorage.getItem(key);
    if (ret == null) {
      return defaultValue;
    }
    ret = +ret;
    if (isNaN(ret)) {
      return defaultValue;
    }
    return ret;
  },
  async setNumber(key, val = 0) {
    await AsyncStorage.setItem(key, '' + val);
  },
  async getString(key, defaultValue = '') {
    const ret = await AsyncStorage.getItem(key);
    if (ret == null) {
      return defaultValue;
    }
    return ret;
  },
  async setString(key, val = '') {
    await AsyncStorage.setItem(key, '' + val);
  },
  async getBool(key, defaultValue = false) {
    const ret = await AsyncStorage.getItem(key);
    if (ret == null) {
      return defaultValue;
    }
    return ret === '1';
  },
  async setBool(key, val = false) {
    await AsyncStorage.setItem(key, val ? '1' : '0');
  },
  async getObject(key, defaultValue = {}) {
    let ret = await AsyncStorage.getItem(key);
    if (ret == null) {
      return defaultValue;
    }
    try {
      ret = JSON.parse(ret);
    } catch (e) {
      ret = defaultValue;
    }
    return ret;
  },
  async setObject(key, val = {}) {
    await AsyncStorage.setItem(key, JSON.stringify(val));
  },
  // lc.updateObject('list', o => o.push(1), []);
  async updateObject(key, callback, defaultValue) {
    let val = await this.getObject(key, defaultValue);
    val = callback(val);
    await this.setObject(key, val);
  },
  async getArray(key, defaultValue = []) {
    let ret = await AsyncStorage.getItem(key);
    if (ret == null) {
      return defaultValue;
    }
    try {
      ret = JSON.parse(ret);
    } catch (e) {
      ret = defaultValue;
    }
    if (!_.isArray(ret)) {
      ret = defaultValue;
    }
    return ret;
  },
  async setArray(key, val = []) {
    await AsyncStorage.setItem(key, JSON.stringify(val));
  },
  async updateArray(key, callback, defaultValue) {
    let val = await this.getArray(key, defaultValue);
    val = callback(val);
    await this.setArray(key, val);
  },
  async remove(key) {
    await AsyncStorage.removeItem(key);
  },
  async clear() {
    await AsyncStorage.clear();
  },
};
