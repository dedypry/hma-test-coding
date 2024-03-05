export const routes = [
    { path: '/', redirect: '/dashboard' },
    {
        path: '/',
        component: () => import('@/layouts/default.vue'),
        children: [
            {
                path: 'dashboard',
                component: () => import('@/pages/dashboard.vue'),
                meta: {
                    authOnly: true
                }
            },
            {
                path: 'users',
                component: () => import('@/pages/users.vue'),
                meta: {
                    authOnly: true
                }
            },
        ],
    },
    {
        path: '/',
        component: () => import('@/layouts/blank.vue'),
        children: [
            {
                path: 'login',
                component: () => import('@/pages/login.vue'),
                meta: {
                    guestOnly: true
                }
            },
            {
                path: '/:pathMatch(.*)*',
                component: () => import('@/pages/[...error].vue'),
            },
        ],
    },
]
