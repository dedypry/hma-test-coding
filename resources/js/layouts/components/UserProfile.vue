<script setup>
import { useAuthUserStore } from "@/stores/authStore";
import avatar1 from "@images/avatars/avatar-1.png";
const authStore = useAuthUserStore();
</script>

<template>
    <VBadge
        dot
        location="bottom right"
        offset-x="3"
        offset-y="3"
        color="success"
        bordered
    >
        <VAvatar class="cursor-pointer" color="primary" variant="tonal">
            <VImg :src="avatar1" />

            <!-- SECTION Menu -->
            <VMenu
                activator="parent"
                width="230"
                location="bottom end"
                offset="14px"
            >
                <VList>
                    <!-- 👉 User Avatar & Name -->
                    <VListItem>
                        <template #prepend>
                            <VListItemAction start>
                                <VBadge
                                    dot
                                    location="bottom right"
                                    offset-x="3"
                                    offset-y="3"
                                    color="success"
                                >
                                    <VAvatar color="primary" variant="tonal">
                                        <VImg :src="avatar1" />
                                    </VAvatar>
                                </VBadge>
                            </VListItemAction>
                        </template>

                        <VListItemTitle class="font-weight-semibold">
                            {{ authStore.user.full_name }}
                        </VListItemTitle>
                        <VListItemSubtitle>{{
                            authStore.user.email
                        }}</VListItemSubtitle>
                    </VListItem>
                    <VDivider class="my-2" />
                </VList>
            </VMenu>
            <!-- !SECTION -->
        </VAvatar>
    </VBadge>
</template>
