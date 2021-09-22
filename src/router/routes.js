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
      icon: 'el-icon-s-shop',
      breadcrumb: false
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
        name: 'addUser',
        path: '/addUser',
        component: () => import('@/views/menus/addUser'),
        meta: {
          title: '新增白名单用户',
        },
        hidden: true
      },
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
