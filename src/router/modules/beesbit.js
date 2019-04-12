/** When your routing star is too long, you can split it into small modules**/
/**
 * [beesbitRouter description]
 * 惠民折扣后台管理路由
 * @type {Object}
 */
import Layout from '@/views/layout/Layout'

export const orderRouter = {
  path: '/order',
  component: Layout,
  redirect: '/order/neworder',
  name: 'order',
  meta: {
    title: 'order',
    icon: 'star'
  },
  children: [{
      path: 'neworder',
      component: () => import('@/views/A_beesbit/order/neworder'), // Parent router-view
      name: 'neworder',
      meta: {
        title: 'neworder',
        icon: 'star'
      }
    }
    // {
    //   path: 'reneworder',
    //   component: () => import('@/views/A_beesbit/order/reneworder'), // Parent router-view
    //   name: 'reneworder',
    //   meta: {
    //     title: 'reneworder',
    //     icon: 'star'
    //   }
    // }
  ]
}

export const withdrawRouter = {
  path: '/withdraw',
  component: Layout,
  redirect: '/withdraw/withdraw',
  name: 'withdraw',
  meta: {
    title: 'withdraw',
    icon: 'star'
  },
  children: [{
      path: 'balancewithdraw',
      component: () => import('@/views/A_beesbit/withdraw/balancewithdraw'), // Parent router-view
      name: 'balancewithdraw',
      meta: {
        title: 'balancewithdraw',
        icon: 'star'
      },
    }
    // {
    //   path: 'earningwithdraw',
    //   component: () => import('@/views/A_beesbit/withdraw/earningwithdraw'), // Parent router-view
    //   name: 'earningwithdraw',
    //   meta: {
    //     title: 'earningwithdraw',
    //     icon: 'star'
    //   }
    // }
  ]
}

export const statusRouter = {
  path: '/status',
  component: Layout,
  redirect: '/status/mills',
  name: 'status',
  meta: {
    title: 'status',
    icon: 'star'
  },
  children: [{
      path: 'mills',
      component: () => import('@/views/A_beesbit/status/mills'), // Parent router-view
      name: 'mills',
      meta: {
        title: 'mills',
        icon: 'star'
      }
    }, {
      path: 'notice',
      component: () => import('@/views/A_beesbit/status/notice'), // Parent router-view
      name: 'notice',
      meta: {
        title: 'notice',
        icon: 'star',
        noCache: true
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/A_beesbit/status/edit'), // Parent router-view
      name: 'edit',
      meta: {
        title: 'edit',
        icon: 'star'
      },
      hidden: true
    },
    {
      path: 'millorder',
      component: () => import('@/views/A_beesbit/status/millorder'), // Parent router-view
      name: 'millorder',
      meta: {
        title: 'millorder',
        icon: 'star'
      }
    }
  ]
}

export const userRouter = {
  path: '/user',
  component: Layout,
  redirect: '/user/userinfo',
  name: 'user',
  meta: {
    title: 'user',
    icon: 'star'
  },
  children: [{
      path: 'userinfo',
      component: () => import('@/views/A_beesbit/user/userinfo'), // Parent router-view
      name: 'userinfo',
      meta: {
        title: 'userinfo',
        icon: 'star'
      }
    }
  ]
}

export const settingRouter = {
  path: '/setting',
  component: Layout,
  redirect: '/setting/combo',
  name: 'setting',
  meta: {
    title: 'setting',
    icon: 'star'
  },
  children: [{
    path: 'combo',
    component: () => import('@/views/A_beesbit/setting/combo'), // Parent router-view
    name: 'combo',
    meta: {
      title: 'combo',
      icon: 'star'
    }
  }, {
    path: 'coupon',
    component: () => import('@/views/A_beesbit/setting/coupon'), // Parent router-view
    name: 'coupon',
    meta: {
      title: 'coupon',
      icon: 'star'
    }
  }, {
    path: 'collection',
    component: () => import('@/views/A_beesbit/setting/collection'), // Parent router-view
    name: 'collection',
    meta: {
      title: 'collection',
      icon: 'star'
    }
  }, {
    path: 'service',
    component: () => import('@/views/A_beesbit/setting/service'), // Parent router-view
    name: 'service',
    meta: {
      title: 'service',
      icon: 'star'
    }
  }, {
    path: 'limit',
    component: () => import('@/views/A_beesbit/setting/limit'), // Parent router-view
    name: 'limit',
    meta: {
      title: 'limit',
      icon: 'star'
    }
  }]
}
