import Vue from 'vue'
import Router from 'vue-router'
import DefaultLayout from '../views/layouts/DefaultLayout'

Vue.use(Router)

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
* */
export const constantRouterMap = [
    // { path: '/login', component: () => import('@/views/login/index'), hidden: true },
    { path: '/404', component: () => import('@/views/404'), hidden: true },

    {
        path: '/',
        component: DefaultLayout,
        redirect: '/home',
        name: 'Home',
        hidden: true,
        children: [{
            path: 'home',
            component: () => import('@/views/home/index')
        }]
    },

    {
        path: '/example',
        component: DefaultLayout,
        redirect: '/example/table',
        meta: { title: 'Example', icon: 'el-icon-menu' },
        children: [
            {
                path: 'table',
                name: 'Table',
                component: () => import('@/views/table/index'),
                meta: { title: 'Table', icon: '' }
            },
            {
                path: 'tree',
                name: 'Tree',
                components: () => import('@/views/tree/index'),
                meta: { title: 'Tree', icon: 'tree' }
            }
        ]
    },

    {
        path: '/nested',
        component: DefaultLayout,
        redirect: '/nested/menu1',
        name: 'Nested',
        meta: {
            title: 'Nested',
            icon: 'nested'
        },
        children: [
            {
                path: 'menu1',
                component: () => import('@/views/nested/menu1/index'), // Parent router-view
                name: 'Menu1',
                meta: { title: 'Menu1' },
                children: [
                    {
                        path: 'menu1-1',
                        component: () => import('@/views/nested/menu1/menu1-1'),
                        name: 'Menu1-1',
                        meta: { title: 'Menu1-1' }
                    },
                    {
                        path: 'menu1-2',
                        component: () => import('@/views/nested/menu1/menu1-2'),
                        name: 'Menu1-2',
                        meta: { title: 'Menu1-2' },
                        children: [
                            {
                                path: 'menu1-2-1',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                                name: 'Menu1-2-1',
                                meta: { title: 'Menu1-2-1' }
                            },
                            {
                                path: 'menu1-2-2',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                                name: 'Menu1-2-2',
                                meta: { title: 'Menu1-2-2' }
                            },
                            {
                                path: 'menu1-2-3',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-3/index'),
                                name: 'Menu1-2-3',
                                meta: { title: 'Menu1-2-3' },
                                children: [
                                    {
                                        path: 'menu1-2-3-1',
                                        component: () => import('@/views/nested/menu1/menu1-2/menu1-2-3/menu1-2-3-1'),
                                        name: 'Menu1-2-3-1',
                                        meta: { title: 'Menu1-2-3-1' }
                                    },
                                    {
                                        path: 'menu1-2-3-2',
                                        component: () => import('@/views/nested/menu1/menu1-2/menu1-2-3/menu1-2-3-1'),
                                        name: 'Menu1-2-3-2',
                                        meta: { title: 'Menu1-2-3-2' }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: 'menu1-3',
                        component: () => import('@/views/nested/menu1/menu1-3'),
                        name: 'Menu1-3',
                        meta: { title: 'Menu1-3' }
                    }
                ]
            },
            {
                path: 'menu2',
                component: () => import('@/views/nested/menu2/index'),
                meta: { title: 'Menu2' }
            }
        ]
    },

    { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})
