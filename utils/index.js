import { Platform } from 'react-native';
export const isWeb = Platform.OS === 'web';
export * from './libs/check.js';
export * from './libs/common.js';
export * from './libs/feedback.jsx';
export * from './net';
