import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  /* 商品管理 */
  {
    name: 'Product',
    path: '/product',
    component: Layout,
    redirect: '/product/category/list',
    meta: {
      title: '菜单',
      icon: 'el-icon-s-shop'
    },
    children: [
      {
        name: 'whiteList',
        path: 'whiteList',
        component: () => import('@/views/menus/whiteList'),
        meta: {
          title: '白名单管理',
        },
      },
      {
        name: 'pwdReset',
        path: 'pwdReset',
        component: () => import('@/views/menus/pwdReset'),
        meta: {
          title: '修改密码',
        },
      },
      {
        name: 'Attr',
        path: 'attr/list',
        component: () => import('@/views/product/attr/list'),
        meta: {
          title: '平台属性管理',
        },
      },
      {
        name: 'Spu',
        path: 'spu/list',
        component: () => import('@/views/product/spu/list'),
        meta: {
          title: 'SPU管理',
        },
      },
      {
        name: 'Sku',
        path: 'sku/list',
        component: () => import('@/views/product/sku/list'),
        meta: {
          title: 'SKU管理',
        },
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
