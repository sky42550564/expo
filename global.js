import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import config from '@/config.js';
// react 常用方法
global.useState = useState;
global.useEffect = useEffect;
global.useRef = useRef;
global.useMemo = useMemo;
global.useCallback = useCallback;
// 常用方法
import sr from './utils/libs/screen.js';
global.sr = sr; // 窗口信息
import _ from './utils/libs/lodash.js';
global._ = _; // 数据处理
import moment from './utils/libs/moment.js';
global.moment = moment; // 时间处理
import * as utils from './utils/index.js';
global.utils = utils; // 工具类
global.lc = utils.lc; // 本地存储
global.$alert = utils.$alert; // 提示弹窗
global.$confirm = utils.$confirm; // 确认弹窗
global.$prompt = utils.$prompt; // 输入弹窗
global.$success = utils.$success; // 正确提示
global.$error = utils.$error; // 错误提示
import _t from './utils/i18n/index.js';
global._t = _t; // 国际化字符串转化
import uno from './utils/libs/uno.js';
const u = uno(sr.w);
global._u = u._u; // uno处理css样式
global._us = u._us; // uno处理css样式
import api from './utils/api/index.js';
global.api = api; // 接口定义
import * as CO from './utils/constants/index.js';
global.CO = CO; // 常量定义
// 常用封装
import useRedux from './utils/react-native/useRedux.js';
global.useRedux = useRedux; // 全局属性
import useWatch from './utils/react-native/useWatch.js';
global.useWatch = useWatch; // 属性监听
import useComputed from './utils/react-native/useComputed.js';
global.useComputed = useComputed; // 计算属性
import useMounted from './utils/react-native/useMounted.js';
global.useMounted = useMounted; // 生命周期加载
import useWillUnmount from './utils/react-native/useWillUnmount.js';
global.useWillUnmount = useWillUnmount; // 生命周期卸载
import useForm from './utils/react-native/useForm.js';
global.useForm = useForm; // 表单操作
import Page from './utils/react-native/Page.tsx';
global.Page = Page; // 页面封装
import router from './utils/react-native/router.js';
global.router = router; // 路由操作
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
import Children from '@/components/view/Children';
global.Children = Children; // 子组件
import Div from '@/components/view/Div';
global.Div = Div; // 代替View和Text
import Img from '@/components/view/Img';
global.Img = Img; // 代替Image
import Icon from '@/components/view/Icon';
global.Icon = Icon; // 图标
import UserHead from '@/components/view/UserHead';
global.UserHead = UserHead; // 用户头像
import Checkbox from '@/components/view/Checkbox';
global.Checkbox = Checkbox; // 选择框
import MenuGrid from '@/components/menu/MenuGrid';
global.MenuGrid = MenuGrid; // 网格菜单
import MenuItem from '@/components/menu/MenuItem';
global.MenuItem = MenuItem; // 列表菜单
import MenuTitle from '@/components/menu/MenuTitle';
global.MenuTitle = MenuTitle; // 菜单标题
import ListPage from '@/components/page/crud/ListPage';
global.ListPage = ListPage; // 列表页面
import Detail from '@/components/page/crud/Detail';
global.Detail = Detail; // 详情
import TabsPage from '@/components/page/tabs/TabsPage';
global.TabsPage = TabsPage; // tabs页面
import Tabs  from '@/components/layout/Tabs';
global.Tabs  = Tabs ; // tab卡片
import Banners  from '@/components/layout/Banners';
global.Banners  = Banners ; // 轮播图
import TimeCountDown  from '@/components/layout/TimeCountDown';
global.TimeCountDown  = TimeCountDown ; // 倒计时
import ModalPanel  from '@/components/layout/ModalPanel';
global.ModalPanel  = ModalPanel ; // 弹出框
import ActionPanel  from '@/components/layout/ActionPanel';
global.ActionPanel  = ActionPanel ; // 底部弹出框
// 表单
import FormLabel from '@/components/form/FormLabel';
global.FormLabel = FormLabel; // 表单标签
import FormTextItem from '@/components/form/FormTextItem';
global.FormTextItem = FormTextItem; // 文本输入框
import FormNumberItem from '@/components/form/FormNumberItem';
global.FormNumberItem = FormNumberItem; // 数字输入框
import FormImageItem from '@/components/form/FormImageItem';
global.FormImageItem = FormImageItem; // 图片输入框
import FormBoolItem from '@/components/form/FormBoolItem';
global.FormBoolItem = FormBoolItem; // 是否选择器
import FormSwitchItem from '@/components/form/FormSwitchItem';
global.FormSwitchItem = FormSwitchItem; // 开关选择器
import FormSelectItem from '@/components/form/FormSelectItem';
global.FormSelectItem = FormSelectItem; // 列表选择器
import FormSelectListItem from '@/components/form/FormSelectListItem';
global.FormSelectListItem = FormSelectListItem; // 表格列表选择器
import FormRadioItem from '@/components/form/FormRadioItem';
global.FormRadioItem = FormRadioItem; // 单选选择器
import FormCheckboxItem from '@/components/form/FormCheckboxItem';
global.FormCheckboxItem = FormCheckboxItem; // 多选选择器
import FormDateItem from '@/components/form/FormDateItem';
global.FormDateItem = FormDateItem; // 日期选择器
import FormCityItem from '@/components/form/FormCityItem';
global.FormCityItem = FormCityItem; // 城市选择器
import FormRegionItem from '@/components/form/FormRegionItem';
global.FormRegionItem = FormRegionItem; // 区域选择器
import FormSelectTreeItem from '@/components/form/FormSelectTreeItem';
global.FormSelectTreeItem = FormSelectTreeItem; // 树形选择器
import FormPickerItem from '@/components/form/FormPickerItem';
global.FormPickerItem = FormPickerItem; // 选择器
import FormPlainItem from '@/components/form/FormPlainItem';
global.FormPlainItem = FormPlainItem; // 值显示
import FormArrowItem from '@/components/form/FormArrowItem';
global.FormArrowItem = FormArrowItem; // 剪头表单
import FormScoreItem from '@/components/form/FormScoreItem';
global.FormScoreItem = FormScoreItem; // 评分表单
import FormSliderItem from '@/components/form/FormSliderItem';
global.FormSliderItem = FormSliderItem; // 滑块表单
import FormVerifyCodeItem from '@/components/form/FormVerifyCodeItem';
global.FormVerifyCodeItem = FormVerifyCodeItem; // 验证码表单
import FormItem from '@/components/form/FormItem';
global.FormItem = FormItem; // 表单项


