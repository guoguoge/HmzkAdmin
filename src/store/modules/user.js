import {
  logout,
  getUserInfo
} from '@/api/login'

import {
  Login
} from '@/api/beesbit'

import {
  Message
} from 'element-ui'

import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import {
  jsonpReturn,
  checkRequest
} from '@/utils/index'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    roles: '',
    agent: '',
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_AGENT: (state, agent) => {
      state.agent = agent
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({
      commit
    }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        Login(username, userInfo.password).then(response => {
          console.log(response.data)
          const data = jsonpReturn(response.data).msg
          if (jsonpReturn(response.data).status == 1) {
            commit('SET_TOKEN', data.token) // 存入token
            setToken(data) // 存入的是新的惠民折扣的token
            console.log(getToken())
            Message({
              message: '欢迎来到惠民折扣后台管理系统',
              type: 'success',
              showClose: true
            })
            resolve(response)
          } else {
            Message({
              message: data,
              type: 'error'
            })
            reject(error)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息 惠民折扣直接忽略这个步骤
    GetUserInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          // 由于mockjs 不支持自定义状态码只能这样hack\
          if (!response.data) {
            reject('Verification failed, please login again.')
          }

          const data = response.data
          console.log(data.roles)
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array!')
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({
      commit,
      dispatch
    }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    }
  }
}

export default user
