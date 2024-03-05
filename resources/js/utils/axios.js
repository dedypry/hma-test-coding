import axios from 'axios'
import router from '../plugins/router'
import { useAuthUserStore } from '@/stores/authStore'


const http = axios.create({
    baseURL: `/api/`,
    validateStatus: status => {
        if (status === 401) {
            const auth = useAuthUserStore()

            auth.setUser()
            router.push({ path: 'login' })

        }

        return status >= 200 && status < 300
    },
})

http.interceptors.request.use(config => {
    const auth = useAuthUserStore()

    config.headers.Authorization = `Bearer ${auth.token}`

    return config
})


export default http
