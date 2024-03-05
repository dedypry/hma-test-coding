<script setup>
import VerticalNavSectionTitle from "@/@layouts/components/VerticalNavSectionTitle.vue";
import { useAuthUserStore } from "@/stores/authStore";
import http from "@/utils/axios";
import { notify } from "@/utils/notify";
import VerticalNavGroup from "@layouts/components/VerticalNavGroup.vue";
import VerticalNavLink from "@layouts/components/VerticalNavLink.vue";
import { useRouter } from "vue-router";
const authStore = useAuthUserStore();
const router = useRouter();

function logout() {
    http.post("logout").then(({ data }) => {
        notify(data.message);
        authStore.setUser({
            user: null,
            token: "",
        });
        router.push("/login");
    });
}
</script>

<template>
    <!-- 👉 Dashboards -->
    <VerticalNavLink
        :item="{
            title: 'Dashboards',
            to: '/dashboard',
            icon: 'ri-home-smile-line',
        }"
    />
    <VerticalNavLink
        :item="{
            title: 'Master Pengguna',
            to: '/users',
            icon: 'ri-user-3-line',
        }"
    />
    <VerticalNavLink
        @click="logout"
        :item="{
            title: 'Logout',
            icon: 'ri-logout-box-line',
        }"
    />
</template>
