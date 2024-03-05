<script setup>
import { useUserStore } from "@/stores/userStore";
import http from "@/utils/axios";
import { notify } from "@/utils/notify";
import { emailRules, requiredRules } from "@/utils/rules";
const userStore = useUserStore();
const props = defineProps({
    isDialogVisible: {
        type: Boolean,
        required: true,
    },
    title: {
        type: String,
        default: "Add User",
    },
});
const emit = defineEmits(["update:isDialogVisible"]);
const dialogUpdate = (val) => {
    emit("update:isDialogVisible", val);
};

const formUser = ref();

const form = ref(userStore.form);

async function addUser() {
    const valid = await formUser?.value.validate();

    const passConfirm = form.value.password === form.value.confirm_password;
    if (passConfirm) {
        if (valid.valid) {
            http.post("user", form.value)
                .then(({ data }) => {
                    notify(data.message);
                    userStore.setForm({});
                    userStore.getUser();
                    dialogUpdate(false);
                })
                .catch((err) => {
                    if (err.response.data.message == "validation") {
                        Object.values(err.response.data.data).forEach((e) => {
                            notify(e[0], "error");
                        });
                    }
                });
        }
    } else {
        notify("Password Confirmasi tidak sama", "error");
    }
}
</script>

<template>
    <div>
        <VDialog
            :model-value="props.isDialogVisible"
            @update:model-value="dialogUpdate"
            width="500"
        >
            <VCard :title="props.title">
                <VCardText>
                    <VForm ref="formUser">
                        <VRow>
                            <VCol cols="12">
                                <VRow no-gutters>
                                    <!-- 👉 First Name -->
                                    <VCol cols="12" md="3">
                                        <label for="full_name"
                                            >Nama Lengkap</label
                                        >
                                    </VCol>

                                    <VCol cols="12" md="9">
                                        <VTextField
                                            id="full_name"
                                            v-model="form.full_name"
                                            placeholder="dedy"
                                            persistent-placeholder
                                            density="compact"
                                            :rules="requiredRules()"
                                        />
                                    </VCol>
                                </VRow>
                            </VCol>
                            <VCol cols="12">
                                <VRow no-gutters>
                                    <!-- 👉 First Name -->
                                    <VCol cols="12" md="3">
                                        <label for="email">Email</label>
                                    </VCol>

                                    <VCol cols="12" md="9">
                                        <VTextField
                                            id="email"
                                            v-model="form.email"
                                            placeholder="dedy@gmail.com"
                                            persistent-placeholder
                                            density="compact"
                                            :rules="emailRules()"
                                        />
                                    </VCol>
                                </VRow>
                            </VCol>
                            <VCol cols="12">
                                <VRow no-gutters>
                                    <!-- 👉 First Name -->
                                    <VCol cols="12" md="3">
                                        <label for="password">Password</label>
                                    </VCol>

                                    <VCol cols="12" md="9">
                                        <VTextField
                                            id="password"
                                            v-model="form.password"
                                            placeholder="*********"
                                            persistent-placeholder
                                            density="compact"
                                            :rules="requiredRules()"
                                        />
                                    </VCol>
                                </VRow>
                            </VCol>
                            <VCol cols="12">
                                <VRow no-gutters>
                                    <!-- 👉 First Name -->
                                    <VCol cols="12" md="3">
                                        <label for="confirm_password"
                                            >Konfirmasi Password</label
                                        >
                                    </VCol>

                                    <VCol cols="12" md="9">
                                        <VTextField
                                            id="confirm_password"
                                            v-model="form.confirm_password"
                                            placeholder="*********"
                                            persistent-placeholder
                                            density="compact"
                                            :rules="requiredRules()"
                                        />
                                    </VCol>
                                </VRow>
                            </VCol>
                        </VRow>
                        <VRow>
                            <VCol cols="12" class="text-end">
                                <VBtn @click="addUser">Simpan</VBtn>
                            </VCol>
                        </VRow>
                    </VForm>
                </VCardText>
            </VCard>
        </VDialog>
    </div>
</template>
