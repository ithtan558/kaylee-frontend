import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  {
    path: '/forgot-password',
    component: () => import('@/views/forgotPassword/index'),
    hidden: true
  },
  {
    path: '/reset-password/:token',
    component: () => import('@/views/resetPassword/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authRedirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  { path: '*', redirect: '/404', hidden: true },
  {
    path: '/report',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      roles: ['manager, brand_manager']
    },
    children: [
      {
        path: '',
        component: () => import('@/views/report/index'),
        name: 'Thống kê',
        meta: { title: 'report', icon: 'chart', noCache: true, affix: true, roles: ['manager, brand_manager'] }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      title: 'Quản lý đơn hàng',
      icon: 'component',
      roles: ['brand_manager']
    },
    children: [
      {
        path: 'history',
        component: () => import('@/views/order/history'),
        name: 'Lịch sử đơn hàng',
        meta: { title: 'historyOrder', noCache: true, affix: true, roles: [ 'brand_manager']  }
      },
      {
        path: '',
        component: () => import('@/views/order/index'),
        name: 'Tạo đơn hàng',
        meta: { title: 'Tạo đơn hàng', noCache: true, affix: true, roles: [ 'brand_manager']  }
      },
      {
        path: 'cart',
        component: () => import('@/views/order/cart'),
        name: 'Giỏ hàng',
        meta: { title: 'cart', icon: 'guide', noCache: true, affix: true, roles: [ 'brand_manager']  },
        hidden: true
      }
    ]
  },
  {
    path: '/customer',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      roles: ['brand_manager']
    },
    children: [
      {
        path: '',
        component: () => import('@/views/customer/index'),
        name: 'Khách hàng',
        meta: { title: 'customer', icon: 'user', noCache: true, affix: true, roles: [ 'brand_manager']  }
      },
      {
        path: 'create',
        component: () => import('@/views/customer/create'),
        name: 'Tạo khách hàng',
        meta: { title: 'createCustomer', icon: 'guide', noCache: true, affix: true, roles: [ 'brand_manager']  },
        hidden: true
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/customer/edit'),
        name: 'Sửa khách hàng',
        meta: { title: 'editCustomer', icon: 'guide', noCache: true, affix: true, roles: [ 'brand_manager']  },
        hidden: true
      }
    ]
  },
  {
    path: '/service',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      roles: ['brand_manager']
    },
    children: [
      {
        path: '',
        component: () => import('@/views/service/index'),
        name: 'Dịch vụ',
        meta: { title: 'service', icon: 'guide', noCache: true, affix: true, roles: [ 'brand_manager']  }
      },
      {
        path: 'create',
        component: () => import('@/views/service/create'),
        name: 'Tạo dịch vụ',
        meta: { title: 'createService', icon: 'guide', noCache: true, affix: true, roles: [ 'brand_manager']  },
        hidden: true
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/service/edit'),
        name: 'Sửa dịch vụ',
        meta: { title: 'editService', icon: 'guide', noCache: true, affix: true, roles: [ 'brand_manager'] },
        hidden: true
      }
    ]
  },
  /*{
    path: '/service-category',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      roles: ['brand_manager']
    },
    children: [
      {
        path: '',
        component: () => import('@/views/serviceCategory/index'),
        name: 'Loại Dịch vụ',
        meta: { title: 'serviceCategory', icon: 'guide', noCache: true, affix: true, roles: [ 'brand_manager']  }
      },
      {
        path: 'create',
        component: () => import('@/views/serviceCategory/create'),
        name: 'Tạo loại dịch vụ',
        meta: { title: 'createCategoryService', icon: 'guide', noCache: true, affix: true, roles: [ 'brand_manager']  },
        hidden: true
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/serviceCategory/edit'),
        name: 'Sửa loại dịch vụ',
        meta: { title: 'editCategoryService', icon: 'guide', noCache: true, affix: true, roles: [ 'brand_manager'] },
        hidden: true
      }
    ]
  },*/
  {
    path: '/brand',
    component: Layout,
    meta: {
      roles: ['admin']
    },
    children: [
      {
        path: '',
        component: () => import('@/views/brand/index'),
        name: 'Chi nhánh',
        meta: { title: 'brand', icon: 'tree', noCache: true, affix: true, roles: ['admin'] }
      },
      {
        path: 'create',
        component: () => import('@/views/brand/create'),
        name: 'Tạo chi nhánh',
        meta: { title: 'createBrand', icon: 'guide', noCache: true, affix: true, roles: ['admin'] },
        hidden: true
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/brand/edit'),
        name: 'Sửa chi nhánh',
        meta: { title: 'editBrand', icon: 'guide', noCache: true, affix: true, roles: ['admin'] },
        hidden: true
      }
    ]
  },
  {
    path: '/employee',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      roles: ['admin', 'brand_manager']
    },
    children: [
      {
        path: '',
        component: () => import('@/views/employee/index'),
        name: 'Nhân viên',
        meta: { title: 'employee', icon: 'user', noCache: true, affix: true, roles: ['admin', 'brand_manager'] }
      },
      {
        path: 'create',
        component: () => import('@/views/employee/create'),
        name: 'Tạo nhân viên',
        meta: { title: 'createEmployee', icon: 'guide', noCache: true, affix: true, roles: ['admin', 'brand_manager'] },
        hidden: true
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/employee/edit'),
        name: 'Sửa nhân viên',
        meta: { title: 'editEmployee', icon: 'guide', noCache: true, affix: true, roles: ['admin', 'brand_manager'] },
        hidden: true
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
