<script setup>
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
userStore.getUserList();
</script>

<template>
    <div>
        <VRow>
            <VCol cols="6">
                <VCard>
                    <VCardText class="text-center">
                        <h1 class="mb-10">{{ userStore.user.total }}</h1>
                        <h1>Pengguna Terdaftar</h1>
                    </VCardText>
                </VCard>
            </VCol>
            <VCol cols="6">
                <VCard>
                    <VCardText class="text-center">
                        <h1 class="mb-10">{{ userStore.user.active }}</h1>
                        <h1>Pengguna Aktif</h1>
                    </VCardText>
                </VCard>
            </VCol>
        </VRow>
    </div>
</template>
