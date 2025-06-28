import { useState, useEffect } from 'react';
import config from '@/config.js';
// react 常用方法
global.useState = useState;
global.useEffect = useEffect;
// 常用方法
import sr from './utils/libs/screen.js';
global.sr = sr; // 窗口信息
import _ from './utils/libs/lodash.js';
global._ = _; // 数据处理
import moment from './utils/libs/moment.js';
global.moment = moment; // 时间处理
import * as utils from './utils/index.js';
global.utils = utils;
global.lc = utils.lc; // 本地存储
global.$alert = utils.$alert;
global.$confirm = utils.$confirm;
global.$prompt = utils.$prompt;
global.$success = utils.$success;
global.$error = utils.$error;
import uno from './utils/libs/uno.js';
const u = uno(sr.w);
global._u = u._u; // uno处理css样式
global._us = u._us; // uno处理css样式
import api from './utils/api/index.js';
global.api = api; // 接口定义
import * as CO from './utils/constants/index.js';
global.CO = CO; // 常量定义
import useRedux from './utils/react-native/useRedux.js';
global.useRedux = useRedux; // 常量定义
import Page from './utils/react-native/Page.tsx';
global.Page = Page; // 页面封装

// 路由操作
import { useRouter } from 'expo-router';
const expoRouter = useRouter();
global.router = {
  title: null, // 标题
  headerLeft: null, // 导航栏左边
  headerRight: null, // 导航栏右边
  url: null, // 路由的url
  passProps: {}, // 传递的页面参数
  refs: {}, // 用来保存全局的组件的ref
  api: {}, // 全局的方法
  push(url, params) {
    console.log('router:', url, params);
    const { title, headerLeft, headerRight, ...passProps } = params || {};
    this.title = title;
    this.headerLeft = headerLeft;
    this.headerRight = headerRight;
    this.url = url;
    this.passProps = passProps;
    return new Promise(resolve => {
      expoRouter.push(url);
      resolve();
    });
  },
  back() {
    expoRouter.back();
  },
};
// 图片路径
// 获取静态文件的地址，protocal/user.html -> http://localhost:5188/protocal/user.html
global._url = (url) => {
  return !url || /^http/.test(url) ? url : `${config.server}/${url.replace(/^\//, '')}`;
}
// 获取image的地址，1.png -> http://localhost:5188/img/app/1.png
global._img = (url) => {
  return !url || /^http/.test(url) ? url : `${config.server}/img/${config.project}/${url.replace(/^\//, '')}`;
}
// 获取common的image的地址，1.png -> http://localhost:5188/img/app/1.png
global._imgc = (url) => {
  return !url || /^http/.test(url) ? url : `${config.server}/img/common/${url.replace(/^\//, '')}`;
}

// 自定义rn组件
import Div from '@/components/view/Div';
global.Div = Div;
import Img from '@/components/view/Img';
global.Img = Img;
import Icon from '@/components/view/Icon';
global.Icon = Icon;
import MenuGrid from '@/components/menu/MenuGrid';
global.MenuGrid = MenuGrid;
import MenuItem from '@/components/menu/MenuItem';
global.MenuItem = MenuItem;
import MenuTitle from '@/components/menu/MenuTitle';
global.MenuTitle = MenuTitle;


