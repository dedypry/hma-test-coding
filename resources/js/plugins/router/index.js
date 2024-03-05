import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { useAuthUserStore } from '@/stores/authStore'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default function (app) {
    app.use(router)
}

function haveToken () {
    const auth = useAuthUserStore()

    return !!(auth.token)
}

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authOnly) && !haveToken()) {
        next({
            path: "/login",
        })
    } else if (to.matched.some(record => record.meta.guestOnly) && haveToken()) {
        next({
            path: '/dashboard',
        })
    } else {
        next()
    }
})
export { router }
