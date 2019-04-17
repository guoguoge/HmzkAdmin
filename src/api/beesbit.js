import request from '@/utils/request'

export const Login = (username, password) => {
  // 管理员登录
  return request({
    url: 'admin_login',
    method: 'post',
    data: {
      username: username,
      password: password
    }
  })
}

export const AgentList = (token) => {
  // 代理商管理员列表
  return request({
    url: 'AgentList',
    method: 'post',
    data: {
      token: token
    }
  })
}

export const StatisticUser = (token) => {
  // 代理商管理员列表
  return request({
    url: 'statistic_user',
    method: 'post',
    data: {
      token: token
    }
  })
}

export const FreezeUser = (token, id, is_allow) => {
  // 代理商管理员列表
  return request({
    url: 'freeze_user',
    method: 'post',
    data: {
      token: token,
      id: id,
      is_allow: is_allow
    }
  })
}

export const AddVestUser = (token, name) => {
  // 代理商管理员列表
  return request({
    url: 'add_vest_user',
    method: 'post',
    data: {
      token: token,
      name: name
    }
  })
}

export const VestUser = (token) => {
  // 代理商管理员列表
  return request({
    url: 'statistic_vest_user',
    method: 'post',
    data: {
      token: token
    }
  })
}

export const Category = (token, method) => {
  // 代理商管理员列表
  return request({
    url: 'category',
    method: 'post',
    data: {
      token: token,
      method: method
    }
  })
}

export const AddCategory = (token, method, cat_name, belong, cat_status) => {
  // 代理商管理员列表
  return request({
    url: 'category',
    method: 'post',
    data: {
      token: token,
      method: method,
      cat_name: cat_name,
      belong: belong,
      cat_status: cat_status,
    }
  })
}

export const EditCategory = (token, method, id, cat_name, belong, cat_status) => {
  // 代理商管理员列表
  return request({
    url: 'category',
    method: 'post',
    data: {
      token: token,
      method: method,
      id: id,
      cat_name: cat_name,
      belong: belong,
      cat_status: cat_status,
    }
  })
}

export const DelCategory = (token, method, id) => {
  // 代理商管理员列表
  return request({
    url: 'category',
    method: 'post',
    data: {
      token: token,
      method: method,
      id: id
    }
  })
}

export const ListTreasure = (token, method) => {
  // 代理商管理员列表
  return request({
    url: 'treasure',
    method: 'post',
    data: {
      token: token,
      method: method,
    }
  })
}

export const AddTreasure = (fd) => {
  // 代理商管理员列表
  return request({
    url: 'treasure',
    method: 'post',
    data: fd
  })
}

export const EditTreasure = (fd) => {
  // 代理商管理员列表
  return request({
    url: 'treasure',
    method: 'post',
    data: fd
  })
}

export const DelTreasure = (token, method, id) => {
  // 代理商管理员列表
  return request({
    url: 'treasure',
    method: 'post',
    data: {
      token: token,
      method: method,
      id: id
    }
  })
}

export const AuctionList = (token, method) => {
  // 竞拍商品列表
  return request({
    url: 'auction',
    method: 'post',
    data: {
      token: token,
      method: method
    }
  })
}

export const ChangeAuction = (fd) => {
  // 竞拍状态修改
  return request({
    url: 'auction',
    method: 'post',
    data: fd
  })
}

export const AddAuction = (fd) => {
  // 增加竞拍商品
  return request({
    url: 'auction',
    method: 'post',
    data: fd
  })
}

export const EditAuction = (fd) => {
  // 增加竞拍商品
  return request({
    url: 'auction',
    method: 'post',
    data: fd
  })
}

export const ACate = (token) => {
  // 竞拍商品分类
  return request({
    url: 'aCate',
    method: 'post',
    data: {
      token: token
    }
  })
}

export const AddRule = (token, rules, type, method) => {
  // 竞拍商品分类
  return request({
    url: 'rule',
    method: 'post',
    data: {
      token: token,
      rules: rules,
      type: type,
      method: method
    }
  })
}

export const DelRule = (token, method, rule_id) => {
  // 规则--删除规则
  return request({
    url: 'rule',
    method: 'post',
    data: {
      token: token,
      rules: rules,
      rule_id: rule_id
    }
  })
}

export const EditRule = (token, rules, method, type, rule_id) => {
  // 规则--删除规则
  return request({
    url: 'rule',
    method: 'post',
    data: {
      token: token,
      rules: rules,
      method: method,
      type: type,
      rule_id: rule_id,
    }
  })
}

export const SeeRule = (token, method) => {
  // 规则--删除规则
  return request({
    url: 'rule',
    method: 'post',
    data: {
      token: token,
      method: method
    }
  })
}

export const SetRefund = (token, refund) => {
  // 规则--删除规则
  return request({
    url: 'setRefund',
    method: 'post',
    data: {
      token: token,
      refund: refund
    }
  })
}


export const Refund = (token) => {
  // 规则--删除规则
  return request({
    url: 'aRefund',
    method: 'post',
    data: {
      token: token
    }
  })
}









export const AgentChangeStatus = (token, is_allow, agent_id) => {
  // 代理商管理员列表
  return request({
    url: 'ChangeStatus',
    method: 'post',
    data: {
      token: token,
      is_allow: is_allow,
      agent_id: agent_id
    }
  })
}

export const OrderAuditing = (token, order_id, auditing) => {
  // 后台(财务/会计)确认代理商购买算力
  return request({
    url: 'OrderAuditing',
    method: 'post',
    data: {
      token: token,
      order_id: order_id,
      auditing: auditing
    }
  })
}

export const AgentInfo = (token, agent_id) => {
  // 查看单独代理商信息
  return request({
    url: 'AgentInfo',
    method: 'post',
    data: {
      token: token,
      agent_id: agent_id
    }
  })
}

export const AddAgent = (token, username, password, password_confirm, name, tel, address, domain_name, contract_start, contract_end) => { // 添加代理商管理员
  // 只有超级管理员才有权限新增其他管理员
  return request({
    url: 'AddAgent',
    method: 'post',
    data: {
      token: token,
      username: username,
      password: password,
      password_confirm: password_confirm,
      name: name,
      tel: tel,
      address: address,
      domain_name: domain_name,
      contract_start: contract_start,
      contract_end: contract_end
    }
  })
}

export const AgentPassword = (token, username, password, agent_id, domain_name, address, tel, name, contract_start, contract_end) => { // 添加代理商管理员;
  // 更改代理商密码及其他信息
  return request({
    url: 'Agent_password',
    method: 'post',
    data: {
      token: token,
      username: username,
      password: password,
      agent_id: agent_id,
      domain_name: domain_name,
      address: address,
      tel: tel,
      name: name,
      contract_start: contract_start,
      contract_end: contract_end
    }
  })
}

export const CardList = (token) => {
  // 获取收款信息列表
  return request({
    url: 'Card_list',
    method: 'post',
    data: {
      token: token
    }
  })
}

export const AddCard = (token, cardname, type, cardnum, bank) => {
  // 添加收款信息
  return request({
    url: 'Add_card',
    method: 'post',
    data: {
      token: token,
      cardname: cardname,
      type: type,
      cardnum: cardnum,
      bank: bank
    }
  })
}

export const UpdateCard = (token, id, cardname, type, cardnum, bank) => {
  // 修改收款信息
  return request({
    url: 'Update_card',
    method: 'post',
    data: {
      token: token,
      id: id,
      cardname: cardname,
      type: type,
      cardnum: cardnum,
      bank: bank
    }
  })
}

export const UnlockCard = (token, status, id) => {
  // 开启/关闭收款信息
  return request({
    url: 'Unlock_card',
    method: 'post',
    data: {
      token: token,
      status: status,
      id: id
    }
  })
}

export const DelCard = (token, id) => {
  // 删除收款信息
  return request({
    url: 'Del_card',
    method: 'post',
    data: {
      token: token,
      id: id
    }
  })
}

export const CustomerList = (token, id) => {
  // 管理员添加客服信息
  return request({
    url: 'Customer_list',
    method: 'post',
    data: {
      token: token,
      id: id
    }
  })
}

export const SetCustomer = (token, name, tel, qq, mail) => {
  // 客服信息的列表
  return request({
    url: 'SetCustomer',
    method: 'post',
    data: {
      token: token,
      name: name,
      tel: tel,
      qq: qq,
      mail: mail
    }
  })
}

export const DelCustomer = (token, id) => {
  // 删除设置的客服信息
  return request({
    url: 'DelCustomer',
    method: 'post',
    data: {
      token: token,
      id: id
    }
  })
}

export const MachineList = (token) => {
  // 获取机器列表
  return request({
    url: 'Machine_list',
    method: 'post',
    data: {
      token: token
    }
  })
}

export const AdminList = (token) => {
  // 后台管理员列表
  return request({
    url: 'Admin_list',
    method: 'post',
    data: {
      token: token
    }
  })
}

export const AddAdmin = (token, username, password, permission) => {
  // 添加后台管理员
  return request({
    url: 'Add_admin',
    method: 'post',
    data: {
      token: token,
      username: username,
      password: password,
      permission: permission
    }
  })
}

export const DelAdmin = (token, admin_id) => {
  // 删除后台管理员
  return request({
    url: 'Del_admin',
    method: 'post',
    data: {
      token: token,
      admin_id: admin_id
    }
  })
}

export const Contract = (token, contract) => {
  // 套餐--添加/编辑合同
  return request({
    url: 'Contract',
    method: 'post',
    data: {
      token: token,
      contract: contract
    }
  })
}

export const ContractInfo = (token) => {
  // 套餐--获取合同信息
  return request({
    url: 'Contract_info',
    method: 'post',
    data: {
      token: token
    }
  })
}

export const CombinationList = (token) => {
  // 套餐--套餐列表
  return request({
    url: 'Combination_list',
    method: 'post',
    data: {
      token: token
    }
  })
}

export const DelCombination = (token, combination_id) => {
  // 套餐--删除套餐
  return request({
    url: 'Del_combination',
    method: 'post',
    data: {
      token: token,
      combination_id: combination_id
    }
  })
}

export const AddCombination = (token, title, explain, payway, rmb, usdt, minnum, maxnum, total_num, day, start, end, coin) => {
  // 套餐--添加套餐
  return request({
    url: 'Add_combination',
    method: 'post',
    data: {
      token: token,
      title: title,
      explain: explain,
      payway: payway,
      rmb: rmb,
      usdt: usdt,
      minnum: minnum,
      maxnum: maxnum,
      total_num: total_num,
      day: day,
      start: start,
      end: end,
      coin: coin
    }
  })
}

export const CombinationFreeze = (token, tc_id, freeze) => {
  // 套餐--删除套餐
  return request({
    url: 'Combination_freeze',
    method: 'post',
    data: {
      token: token,
      tc_id: tc_id,
      freeze: freeze
    }
  })
}

export const CouponUser = (token, have_user, have_order, order_scope, end_order, extra_user) => {
  // 优惠券--根据范围选择用户
  return request({
    url: 'Coupon_user',
    method: 'post',
    data: {
      token: token,
      have_user: have_user,
      have_order: have_order,
      order_scope: order_scope,
      end_order: end_order,
      extra_user: extra_user
    }
  })
}

export const SendCoupon = (token, title, content, start, end, user, setting) => {
  // 优惠券--设定及发送优惠券
  return request({
    url: 'Send_coupon',
    method: 'post',
    data: {
      token: token,
      title: title,
      content: content,
      start: start,
      end: end,
      user: user,
      setting: setting
    }
  })
}

export const CouponListUser = (token, coupon_id) => {
  // 优惠券--设定及发送优惠券
  return request({
    url: 'Coupon_list_user',
    method: 'post',
    data: {
      token: token,
      coupon_id: coupon_id
    }
  })
}

export const CouponUserTel = (token, tel) => {
  // 优惠券--根据手机号获取用户
  return request({
    url: 'Coupon_user_tel',
    method: 'post',
    data: {
      token: token,
      tel: tel
    }
  })
}

export const CouponList = (token) => {
  // 优惠券--优惠券列表
  return request({
    url: 'Coupon_list',
    method: 'post',
    data: {
      token: token
    }
  })
}

export const CouponScope = (token) => {
  // 优惠券--优惠券列表
  return request({
    url: 'Coupon_scope',
    method: 'post',
    data: {
      token: token
    }
  })
}

export const DelCoupon = (token, coupon_id) => {
  // 优惠券--优惠券列表
  return request({
    url: 'Del_coupon',
    method: 'post',
    data: {
      token: token,
      coupon_id: coupon_id
    }
  })
}

export const NewsList = (token) => {
  // 公告--公告列表
  return request({
    url: 'NewsList',
    method: 'post',
    data: {
      token: token
    }
  })
}

export const NewsAdd = (token, title, content) => {
  // 公告--发布公告
  return request({
    url: 'NewsAdd',
    method: 'post',
    data: {
      token: token,
      title: title,
      content: content
    }
  })
}

export const NewsDel = (token, id) => {
  // 公告--删除公告
  return request({
    url: 'NewsDel',
    method: 'post',
    data: {
      token: token,
      id: id
    }
  })
}

export const NewsEdit = (token, id, title, content) => {
  // 公告--编辑公告
  return request({
    url: 'NewsEdit',
    method: 'post',
    data: {
      token: token,
      id: id,
      title: title,
      content: content
    }
  })
}

export const Account = (token) => {
  // 后台提现申请列表
  return request({
    url: 'Account',
    method: 'post',
    data: {
      token: token
    }
  })
}

export const AccountCw = (token, id) => {
  // 后台提现申请
  return request({
    url: 'AccountCw',
    method: 'post',
    data: {
      token: token,
      id: id
    }
  })
}

export const AccountCn = (token, id) => {
  // 后台提现申请
  return request({
    url: 'AccountCn',
    method: 'post',
    data: {
      token: token,
      id: id
    }
  })
}

export const AccountCancle = (token, id) => {
  // 后台取消提现申请
  return request({
    url: 'AccountCancle',
    method: 'post',
    data: {
      token: token,
      id: id
    }
  })
}

export const StatisticWeb = (token) => {
  // 网站数据统计
  return request({
    url: 'Statistic_web',
    method: 'post',
    data: {
      token: token
    }
  })
}

export const Message = (tel) => {
  // 消息提醒--获取内容
  return request({
    url: 'messages',
    method: 'post',
    data: {
      tel: tel
    }
  })
}

export const DeleteMessage = (tel) => {
  // 消息提醒--进行已读
  return request({
    url: 'delete_message',
    method: 'post',
    data: {
      tel: tel
    }
  })
}

export const PowerOrderList = (token) => {
  // 算力订单--用户算力订单列表
  return request({
    url: 'power_order_list',
    method: 'post',
    data: {
      token: token
    }
  })
}

export const PowerOrderAuditing = (token, order_id, auditing) => {
  // 算力订单--用户算力订单 (出纳/会计) 确认
  return request({
    url: 'power_order_auditing',
    method: 'post',
    data: {
      token: token,
      order_id: order_id,
      auditing: auditing
    }
  })
}

export const PowerOrderCancle = (token, order_id) => {
  // 算力订单--用户算力订单取消
  return request({
    url: 'power_order_cancle',
    method: 'post',
    data: {
      token: token,
      order_id: order_id
    }
  })
}

export const RenewOrderList = (token) => {
  // 算力订单--续费订单列表
  return request({
    url: 'Renew_order_list',
    method: 'post',
    data: {
      token: token
    }
  })
}

export const RenewOrderAuditing = (token, order_id, auditing) => {
  // 算力订单--续费订单(出纳/会计)确认
  return request({
    url: 'Renew_order_auditing',
    method: 'post',
    data: {
      token: token,
      order_id: order_id,
      auditing: auditing
    }
  })
}

export const ItcOrderList = (token) => {
  // 矿机订单itc
  return request({
    url: 'ItcOrderList',
    method: 'post',
    data: {
      token: token
    }
  })
}

export const ItcOrderEdit = (token, id) => {
  // 矿机订单itc
  return request({
    url: 'ItcOrderEdit',
    method: 'post',
    data: {
      token: token,
      id: id
    }
  })
}

export const ItcOrderCancle = (token, id) => {
  // 取消矿机订单
  return request({
    url: 'ItcOrderCancle',
    method: 'post',
    data: {
      token: token,
      id: id
    }
  })
}

export const ItcOrderSetTrackingNum = (token, id, tracking_number) => {
  // 设置运单号
  return request({
    url: 'ItcOrderSetTrackingNum',
    method: 'post',
    data: {
      token: token,
      id: id,
      tracking_number: tracking_number
    }
  })
}
