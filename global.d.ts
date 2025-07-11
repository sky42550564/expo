// 声明全面变量，防止vscode报错
declare global {
  // react 常用方法
  const useState: any;
  const useEffect: any;
  const useRef: any;
  const useMemo: any;
  const useCallback: any;
  // 常用方法
  const sr: any; // 窗口信息
  const _: any; // 数据处理
  const moment: any; // 时间处理
  const utils: any; // 工具类
  const lc: any; // 本地存储
  const _t: any; // 国际化字符串转化
  const _u: any; // uno严格转化
  const _us: any;  // uno渐变转化
  const api: any; // 访问api
  const CO: any; // 常量
  const useRedux: any;  // 全局属性
  const useWatch: any; // 属性监听
  const useComputed: any; // 计算属性
  const useMounted: any; // 生命周期加载
  const useWillUnmount: any; // 生命周期卸载
  const useForm: any; // 表单操作
  const Page: any; // 页面封装
  // 路由操作
  const router: any;
  // 交互
  const $alert: any; // 提示弹窗
  const $confirm: any; // 确认弹窗
  const $prompt: any; // 输入弹窗
  const $success: any; // 正确提示
  const $error: any; // 错误提示
  // 图片路径
  const _url: any;
  const _img: any;
  const _imgc: any;
  // 自定义rn组件
  const Children: any; // 子组件
  const Div: any; // 代替View和Text
  const Img: any; // 代替Image
  const Icon: any; // 图标
  const UserHead: any; // 用户头像
  const Checkbox: any; // 选择框
  const MenuGrid: any; // 网格菜单
  const MenuItem: any; // 列表菜单
  const MenuTitle: any; // 菜单标题
  const ListPage: any; // 列表页面
  const Detail: any; // 详情
  const TabsPage: any; // tabs页面
  const Tabs: any; // tab卡片
  const Banners: any; // 轮播图
  const TimeCountDown: any; // 倒计时
  const ModalPanel: any; // 弹出框
  const ActionPanel: any; // 底部弹出框
  // 表单
  const FormLabel: any; // 表单标签
  const FormTextItem: any; // 文本输入框
  const FormNumberItem: any; // 数字输入框
  const FormImageItem: any; // 图片输入框
  const FormSwitchItem: any;  // 开关选择器
  const FormBoolItem: any;  // 是否选择器
  const FormSelectItem: any;  // 列表选择器
  const FormSelectListItem: any;  // 表格列表选择器
  const FormRadioItem: any; // 单选选择器
  const FormCheckboxItem: any; // 多选选择器
  const FormDateItem: any; // 日期选择器
  const FormCityItem: any; // 城市选择器
  const FormRegionItem: any; // 区域选择器
  const FormSelectTreeItem: any // 树形选择器
  const FormPickerItem: any; // 选择器
  const FormPlainItem: any; // 值显示
  const FormArrowItem: any; // 剪头表单
  const FormScoreItem: any; // 评分表单
  const FormSliderItem: any; // 滑块表单
  const FormVerifyCodeItem: any; // 验证码表单
  const FormItem: any; // 表单项
}
export { };
