import http from "@/utils/axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore('users', {
    state: () => ({
        user: {},
        data: {
            data: [],
        },
        form: {
            full_name: "",
            email: "",
            password: "",
            confirm_password: "",
        }
    }),
    actions: {
        getUser (search = "") {
            http.get(`user?search=${search}`).then(({ data }) => {
                console.log(data)
                this.data = data.data
            })
        },
        setForm (data) {
            console.log(data)
            this.form['id'] = data.id;
            this.form.full_name = data.full_name;
            this.form.email = data.email;
            this.form.password = data.password;
            this.form.confirm_password = data.confirm_password;
        },
        getUserList () {
            http.get('user/list').then(({ data }) => {
                this.user = data;
            })
        }
    }
})
