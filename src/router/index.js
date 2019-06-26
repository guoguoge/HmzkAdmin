import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'
/*
惠民折扣路由
 */
import {
  userRouter,
  orderRouter,
  withdrawRouter,
  statusRouter,
  settingRouter
} from './modules/beesbit'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/

export const constantRouterMap = [{
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () =>
        import('@/views/dashboard/index'),
      name: 'Dashboard',
      meta: {
        title: 'dashboard',
        icon: 'dashboard',
        noCache: true
      }
    }]
  },
  {
    path: '',
    component: Layout,
    redirect: '/workbench',
    meta: {
      title: 'workbench',
      icon: 'peoples',
    },
    children: [{
      path: '/workbench',
      name: 'workbench',
      component: () =>
        import('@/views/A_beesbit/workbench/workbench'),
      meta: {
        title: 'workbench',
        icon: 'peoples'
      },
    }]
  },
  userRouter,
  orderRouter,
  withdrawRouter,
  {
    path: '',
    component: Layout,
    redirect: '/agent',
    name: 'agent',
    meta: {
      title: 'agent',
      icon: 'star'
    },
    children: [{
        path: '/agent',
        name: 'agent',
        component: () =>
          import('@/views/A_beesbit/agent/agent'),
        meta: {
          title: 'agent',
          icon: 'people'
        }
      },
      {
        path: 'notice',
        component: () =>
          import('@/views/A_beesbit/status/notice'), // Parent router-view
        name: 'notice',
        meta: {
          title: 'notice',
          icon: 'star',
          noCache: true
        }
      },
      {
        path: 'bannerManager',
        component: () =>
          import('@/views/A_beesbit/withdraw/bannerManager'), // Parent router-view
        name: 'bannerManager',
        meta: {
          title: 'bannerManager',
          icon: 'star',
          noCache: true
        }
      },
      {
        path: 'gift',
        component: () =>
          import('@/views/A_beesbit/user/gift'), // Parent router-view
        name: 'gift',
        meta: {
          title: 'userdata',
          icon: 'star',
          noCache: true
        }
      },
      {
        path: 'userWithdraw',
        component: () =>
          import('@/views/A_beesbit/user/userWithdraw'), // Parent router-view
        name: 'userWithdraw',
        meta: {
          title: 'withdraw',
          icon: 'star',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/login',
    component: () =>
      import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () =>
      import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () =>
      import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () =>
      import('@/views/errorPage/401'),
    hidden: true
  },
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

export const asyncRouterMap = [{
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path*',
      component: () =>
        import('@/views/redirect/index')
    }]
  },

  /**当路由表太长时，可以将其分割成小模块**/
  /*
  代理商控制台
   */
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }

]

export const agentRouterMap = [{
  path: '',
  component: Layout,
  redirect: '/workbench',
  meta: {
    title: 'workbench',
    icon: 'peoples',
  },
  children: [{
    path: '/workbench',
    name: 'workbench',
    component: () =>
      import('@/views/A_beesbit/workbench/workbench'),
    meta: {
      title: 'workbench',
      icon: 'peoples'
    },
  }]
}]
