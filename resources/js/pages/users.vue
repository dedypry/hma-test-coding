<script setup>
import { useUserStore } from "@/stores/userStore";
import { ref } from "vue";
import DialogAdd from "@/views/users/DialogAdd.vue";
import { confirmDialog, notify } from "@/utils/notify";
import http from "@/utils/axios";

const userStore = useUserStore();
userStore.getUser();
const currentPage = ref(1);
const isDialogShow = ref(false);
const search = ref("");
function edit(data) {
    userStore.setForm(data);
    isDialogShow.value = true;
}

function deleteItem(id) {
    http.delete(`user/${id}`).then(({ data }) => {
        notify(data.message);
        userStore.getUser();
    });
}
</script>

<template>
    <div>
        <VCard title="User List">
            <VCardText>
                <VRow>
                    <VCol cols="6">
                        <VBtn @click="isDialogShow = !isDialogShow"
                            >Tambah User</VBtn
                        >
                        <DialogAdd v-model:isDialogVisible="isDialogShow" />
                    </VCol>
                    <VCol cols="6">
                        <VTextField
                            v-model="search"
                            label="Search"
                            density="compact"
                            @keydown.enter="userStore.getUser(search)"
                        />
                    </VCol>
                </VRow>
            </VCardText>
            <VCardText>
                <VTable>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Email</th>
                            <th class="text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(item, i) in userStore.data.data"
                            :key="item.id"
                        >
                            <td>{{ i + 1 }}</td>
                            <td>{{ item.full_name }}</td>
                            <td>{{ item.email }}</td>
                            <td class="text-center">
                                <VBtn
                                    color="warning"
                                    class="mx-2"
                                    @click="edit(item)"
                                >
                                    <VIcon start icon="ri-edit-2-fill" />
                                    Edit
                                </VBtn>
                                <VBtn
                                    color="error"
                                    @click="
                                        confirmDialog(() => deleteItem(item.id))
                                    "
                                >
                                    <VIcon start icon="ri-delete-bin-7-line" />
                                    Hapus
                                </VBtn>
                            </td>
                        </tr>
                    </tbody>
                </VTable>
                <VPagination
                    v-model="currentPage"
                    :length="userStore.data.last_page"
                    rounded="circle"
                    :total-visible="5"
                />
            </VCardText>
        </VCard>
    </div>
</template>
