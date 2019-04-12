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
