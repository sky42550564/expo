import { Platform } from 'react-native';
export const isWeb = Platform.OS === 'web';
export * from './libs/check.js';
export * from './libs/common.js';
export * from './libs/feedback.jsx';
export { default as lc } from './libs/localStorage.js';
export * from './net';
