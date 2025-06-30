// 声明全面变量，防止vscode报错
declare global {
  // react 常用方法
  const useState: any;
  const useEffect: any;
  const useRef: any;
  const forwardRef: any;
  const useImperativeHandle: any;
  // 常用方法
  const sr: any;
  const _: any;
  const moment: any;
  const utils: any;
  const lc: any;
  const _u: any;
  const _us: any;
  const api: any;
  const CO: any;
  const useRedux: any;
  const Page: any;
  // 路由操作
  const router: any;
  // 交互
  const $alert: any;
  const $confirm: any;
  const $prompt: any;
  const $success: any;
  const $error: any;
  // 图片路径
  const _url: any;
  const _img: any;
  const _imgc: any;
  // 自定义rn组件
  const Div: any; // 代替View和Text
  const Img: any; // 代替Image
  const Icon: any; // 图标
  const Checkbox: any; // 选择框
  const MenuGrid: any; // 网格菜单
  const MenuItem: any; // 列表菜单
  const MenuTitle: any; // 菜单标题
  const List: any; // 列表
  const ModalPanel: any; // 弹出框
  const ActionPanel: any; // 底部弹出框
  // 表单
  const FormTextItem: any; // 文本输入框
  const FormNumberItem: any; // 数字输入框
  const FormImageItem: any; // 图片输入框
  const FormRadioItem: any; // 单选输入框
  const FormCheckboxItem: any; // 多选输入框
}
export { };
