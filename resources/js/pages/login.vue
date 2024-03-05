<script setup>
import { useTheme } from "vuetify";
import logo from "@images/logo.svg?raw";
import authV1MaskDark from "@images/pages/auth-v1-mask-dark.png";
import authV1MaskLight from "@images/pages/auth-v1-mask-light.png";
import authV1Tree2 from "@images/pages/auth-v1-tree-2.png";
import authV1Tree from "@images/pages/auth-v1-tree.png";
import { useAuthUserStore } from "@/stores/authStore";
import { VForm } from "vuetify/components/VForm";
import { emailRules, requiredRules } from "@/utils/rules";
import http from "@/utils/axios";
import { notify, notifyError } from "@/utils/notify";
import { useRouter } from "vue-router";

const authStore = useAuthUserStore();
const formLogin = ref();
const router = useRouter();
const form = ref({
    email: "",
    password: "",
    remember: false,
});

const vuetifyTheme = useTheme();

const authThemeMask = computed(() => {
    return vuetifyTheme.global.name.value === "light"
        ? authV1MaskLight
        : authV1MaskDark;
});

const isPasswordVisible = ref(false);

async function login() {
    const valid = await formLogin?.value.validate();
    if (valid.valid) {
        authStore.setLoading(true);
        await http
            .post("login", form.value)
            .then(({ data }) => {
                authStore.setUser(data.data);
                notify(data.message);
                router.push("/dashboard");
            })
            .catch((err) => notifyError(err));
        authStore.setLoading(false);
    }
}
</script>

<template>
    <!-- eslint-disable vue/no-v-html -->

    <div class="auth-wrapper d-flex align-center justify-center pa-4">
        <VCard class="auth-card pa-4 pt-7" max-width="448">
            <VCardItem class="justify-center">
                <template #prepend>
                    <div class="d-flex">
                        <div v-html="logo" />
                    </div>
                </template>

                <VCardTitle
                    class="font-weight-semibold text-2xl text-uppercase"
                >
                    DEDY PRIYATNA
                </VCardTitle>
            </VCardItem>

            <VCardText class="pt-2">
                <h5 class="text-h5 font-weight-semibold mb-1">
                    Welcome to Dedy Dashboard! 👋🏻
                </h5>
                <p class="mb-0">
                    Please sign-in to your account and start the adventure
                </p>
            </VCardText>

            <VCardText>
                <VForm ref="formLogin" @submit.prevent="() => {}">
                    <VRow>
                        <!-- email -->
                        <VCol cols="12">
                            <VTextField
                                v-model="form.email"
                                label="Email"
                                type="email"
                                :rules="emailRules()"
                            />
                        </VCol>

                        <!-- password -->
                        <VCol cols="12">
                            <VTextField
                                v-model="form.password"
                                label="Password"
                                placeholder="············"
                                :type="isPasswordVisible ? 'text' : 'password'"
                                :append-inner-icon="
                                    isPasswordVisible
                                        ? 'ri-eye-off-line'
                                        : 'ri-eye-line'
                                "
                                @click:append-inner="
                                    isPasswordVisible = !isPasswordVisible
                                "
                                :rules="requiredRules()"
                            />

                            <!-- remember me checkbox -->
                            <div
                                class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4"
                            ></div>

                            <!-- login button -->
                            <VBtn
                                :disabled="authStore.loading"
                                block
                                @click="login"
                            >
                                Login
                            </VBtn>
                        </VCol>
                    </VRow>
                </VForm>
            </VCardText>
        </VCard>

        <VImg
            class="auth-footer-start-tree d-none d-md-block"
            :src="authV1Tree"
            :width="250"
        />

        <VImg
            :src="authV1Tree2"
            class="auth-footer-end-tree d-none d-md-block"
            :width="350"
        />

        <!-- bg img -->
        <VImg class="auth-footer-mask d-none d-md-block" :src="authThemeMask" />
    </div>
</template>

<style lang="scss">
@use "@core-scss/pages/page-auth.scss";
</style>
