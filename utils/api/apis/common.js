import r from '../registerApi';
const admin = '/admin/';
const common = '/common/';

export default {
    // 个人中心
    getSettingInfo: r(admin + 'getSettingInfo'), // 获取配置项
    login: r(common + 'login'), // 用户登录
    register: r(common + 'register'), // 用户注册
    changePhone: r(common + 'changePhone'), // 更换电话号码
    modifyPassword: r(common + 'modifyPassword'), // 修改密码
    resetPassword: r(common + 'resetPassword'), // 重置密码
    getPersonalInfo: r(common + 'getPersonalInfo'), // 获取个人信息
    modifyPersonalInfo: r(common + 'modifyPersonalInfo'), // 修改个人信息
    requestSendVerifyCode: r(common + 'requestSendVerifyCode'), // 获取验证码
};
