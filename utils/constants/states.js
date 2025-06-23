// 审核的状态
export const CS_TO_CHECK = 1; // 待审核
export const CS_SUCCESS = 2; // 审核通过
export const CS_REFUSED = 3; // 审核未通过
export const CS_FROZEN = 4; // 冻结中
export const CS_CANCELED = 5; // 已取消
export const CS_MAP = {
    [CS_TO_CHECK]: '待审核',
    [CS_SUCCESS]: '正常',
    [CS_REFUSED]: '审核未通过',
    [CS_FROZEN]: '冻结中',
    [CS_CANCELED]: '已取消',
};
// 处理的状态
export const DS_WAIT_DEAL = 1; // 等待中
export const DS_TO_DEAL = 2; // 待处理
export const DS_SUCCESS = 3; // 已处理
export const DS_REFUSED = 4; // 已驳回
export const DS_SUSPEND = 5; // 已挂起
export const DS_MAP = {
    [DS_WAIT_DEAL]: '等待中',
    [DS_TO_DEAL]: '待处理',
    [DS_SUCCESS]: '已处理',
    [DS_REFUSED]: '已驳回',
    [DS_SUSPEND]: '已挂起',
};
// 订单的状态
export const OS_TO_PAYMENT = 1; // 待支付
export const OS_PAYED = 2; // 已支付
export const OS_TO_DELIVER = 2; // 待发货
export const OS_TO_DELIVER_PART = 21; // 部分发货
export const OS_TO_RECEIVE = 3; // 待收货
export const OS_SUCCESS = 4; // 已完成
export const OS_CANCELED = 5; // 已取消
export const OS_MAP = {
    [OS_TO_PAYMENT]: '待支付',
    [OS_TO_DELIVER]: '待发货',
    [OS_TO_RECEIVE]: '待收货',
    [OS_SUCCESS]: '已完成',
    [OS_CANCELED]: '已取消',
    [OS_TO_DELIVER_PART]: '部分发货',
};
// 心理咨询的状态
export const PC_TO_PAYMENT = 1; // 待支付
export const PC_PAYED = 2; // 已支付
export const PC_IN_CONSULTATION = 3; // 咨询中
export const PC_SUCCESS = 4; // 已完成
export const PC_CANCELED = 5; // 已取消
export const PC_MAP = {
    [PC_TO_PAYMENT]: '待支付',
    [PC_PAYED]: '已支付',
    [PC_IN_CONSULTATION]: '咨询中',
    [PC_SUCCESS]: '已完成',
    [PC_CANCELED]: '已取消',
};
// 提现的状态
export const WS_TO_CHECK = 1; // 待审核
export const WS_CHECKED = 2; // 审核通过
export const WS_REFUSED = 3; // 审核未通过
export const WS_SUCCESS = 4; // 已到账
export const WS_FAILED = 5; // 提现失败
export const WS_CANCELED = 6; // 已取消
export const WS_MAP = {
    [WS_TO_CHECK]: '待审核',
    [WS_CHECKED]: '审核通过',
    [WS_REFUSED]: '审核未通过',
    [WS_SUCCESS]: '已到账',
    [WS_FAILED]: '提现失败',
    [WS_CANCELED]: '已取消',
};
// 退款的状态
export const RS_SUBMIT = 1; // 已提交
export const RS_SUCCESS = 2; // 退款成功
export const RS_FAILED = 3; // 退款失败
export const RS_MAP = {
    [RS_SUBMIT]: '已提交',
    [RS_SUCCESS]: '退款成功',
    [RS_FAILED]: '退款失败',
};
