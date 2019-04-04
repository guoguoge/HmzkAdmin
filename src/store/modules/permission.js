import {
  asyncRouterMap,
  constantRouterMap,
  agentRouterMap
} from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = {
      ...route
    }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const permission = {
  state: {
    routers: [],
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({
      commit
    }, data) {
      return new Promise(resolve => {
        const agent = data
        console.log(agent.agent, "agent2");
        let accessedRouters
        if (agent.agent == 0) {
          accessedRouters = asyncRouterMap
          //如果用户为'0' 那么所有的路由对齐开放 管理员
        } else {
          accessedRouters = [].concat(agentRouterMap)
          // accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
          //如果用户的权限不包含'admin' 那么分配匹配的路由对齐开放
        }
        console.log(accessedRouters);
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
