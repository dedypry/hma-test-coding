import { defineStore } from "pinia";
import http from "../utils/axios";
import { notify, notifyError } from "@/utils/notify";

export const useAuthUserStore = defineStore('authStore', {
    state: () => ({
        token: '',
        user: null,
        loading: false
    }),
    actions: {
        setUser (data) {
            this.user = data.user;
            this.token = data.token;
        },
        setLoading (val) {
            this.loading = val;
        },
        async register (form) {
            this.loading = true;
            await http.post('register', form)
                .then(({ data }) => {
                    this.user = data.data.user;
                    this.token = data.data.token;
                    router.push({ name: 'dashboard' })
                    notify(data.message)
                })
                .catch(err => notifyError(err))

            this.loading = false
        },
    },
    persist: {
        storage: sessionStorage,
        paths: ['token', 'user'],
    },
})
