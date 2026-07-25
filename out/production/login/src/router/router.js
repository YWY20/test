import { createRouter, createWebHistory } from 'vue-router'

let router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        {
            path: '/login',
            component: () => import('../components/Login.vue'),
            name: 'login',
        },
        {
            path: '/index',
            component: () => import('../components/views/Home.vue'),
            name: 'home',
            meta: { requireAuth: true }, // 添加元数据，表示需要登录才能访问
            children: [
                {
                    path: '',
                    component: () => import('../components/views/HomePage.vue'),
                    name: 'home-page',
                    meta: { title: '首页' }
                },
                // 图书管理
                {
                    path: 'book/list',
                    component: () => import('../components/views/book/List.vue'),
                    name: 'book-list',
                    meta: { title: '图书列表' }
                },
                {
                    path: 'book/add',
                    component: () => import('../components/views/book/Add.vue'),
                    name: 'add-book',
                    meta: { title: '添加图书' },
                    props: (route) => ({
                        mode: route.query.mode || 'add'
                    })
                },
                // 图书查询
                {
                    path: 'book/detail/:id',
                    component: () => import('../components/views/book/Add.vue'),
                    name: 'book-detail',
                    meta: { title: '图书查询' },
                    props: (route) => ({
                        id: route.params.id,
                        mode: route.query.mode || 'add' // 从query中获取mode
                    })
                },
                // 图书编辑
                {
                    path: 'book/edit/:id',
                    component: () => import('../components/views/book/Add.vue'),
                    name: 'book-edit',
                    meta: { title: '图书编辑' },
                    props: (route) => ({
                        id: route.params.id,
                        mode: route.query.mode || 'add' // 从query中获取mode
                    })
                },
                {
                    path: 'book/category',
                    component: () => import('../components/views/book/Category.vue'),
                    name: 'book-category',
                    meta: { title: '图书分类' }
                },
                {
                    path: 'book/inventory',
                    component: () => import('../components/views/book/Inventory.vue'),
                    name: 'inventory-manage',
                    meta: { title: '库存管理' }
                },
            ]
        },
        // 默认重定向到登录页面
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/',
            name: 'any'
        }
        // 其他路由配置...
    ]
});

export default router