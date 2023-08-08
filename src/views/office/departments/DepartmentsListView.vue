<template>
    <!-- page header  -->
    <div class="flex flex-col">
        <div class="flex flex-row">
            <div class="flex-1 flex-col">
                <h2 class="font-medium text-xl ">Odjeli</h2>
                <!-- page description  -->
                <p class="text-blue-500">Pregled odjela</p>
            </div>
            <div class="flex-1 flex-col">
                <Button label="Dodaj odjel" icon="pi pi-plus" size="small" @click="activateAdding"
                    v-if="!isAddingActive"></Button>
            </div>
        </div>

        <!-- inline adding of new department -->
        <div class="grid grid-cols-2 lg:grid-cols-4 mt-2 pl-2 shadow" v-if="isAddingActive">
            <div class="py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                <VTextField label="Naziv" />
            </div>
            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                <VTextField label="Opis" />
            </div>
            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                <VTextField label="Odgovorna osoba" />
            </div>
            <!-- actions -->
            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                <span>
                    <span class="text-xs text-gray-400 lg:hidden">Akcije:</span>
                    <span class="flex">
                        <ContentSavePlus fillColor="green" @click="saveNewdepartment" />
                        <Close fillColor="red" @click="cancelAdding" />
                    </span>
                </span>
            </div>
        </div>
    </div>

    <div class="flex flex-col mt-4">
        <div class="overflow-x-auto">
            <div class="shadow overflow-hidden sm:rounded-lg">
                <!-- table header -->
                <div class="bg-gray-50 hidden lg:block" v-if="!isLoading">
                    <div class="grid grid-cols-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div class="px-6 py-3">Naziv</div>
                        <div class="px-6 py-3">Opis</div>
                        <div class="px-6 py-3">Odgovorna osoba</div>
                        <div class="px-6 py-3"></div>
                    </div>
                </div>
                <!-- table body -->
                <div class="bg-white divide-y divide-gray-200" v-if="!isLoading">
                    <template v-for="(department, index) in departments" :key="index">

                        <!-- normal view -->
                        <div class="grid grid-cols-2 lg:grid-cols-4" v-if="editingId != department.id">
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden">Naziv:</span>
                                <span>{{ department.name }}</span>
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden">Opis:</span>
                                <span>{{ department.description }}</span>
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden">Odgovorna osoba:</span>
                                <span>{{ department.manager }}</span>
                            </div>
                            <!-- actions -->
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span>
                                    <span class="text-xs text-gray-400 lg:hidden">Akcije:</span>
                                    <span class="flex">
                                        <Pencil @click="activateEditing(department.id)" />
                                        <DeleteOutline />
                                    </span>
                                </span>
                            </div>
                        </div>

                        <!-- inline editing -->
                        <div class="grid grid-cols-2 lg:grid-cols-4" v-else>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <VTextField label="Naziv" />
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <VTextField label="Opis" />
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <VTextField label="Odgovorna osoba" />
                            </div>
                            <!-- actions -->
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span>
                                    <span class="text-xs text-gray-400 lg:hidden">Akcije:</span>
                                    <span class="flex">
                                        <Check fillColor="green" @click="saveEditing" />
                                        <Close fillColor="red" @click="cancelEditing" />
                                    </span>
                                </span>
                            </div>
                        </div>
                    </template>
                </div>
                <v-circular-loader v-else />
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import Pencil from 'vue-material-design-icons/Pencil.vue';
import DeleteOutline from 'vue-material-design-icons/DeleteOutline.vue';
import VTextField from '@/components/base/VTextField.vue';
import VCircularLoader from '@/components/base/VCircularLoader.vue';
import Close from 'vue-material-design-icons/Close.vue';
import Check from 'vue-material-design-icons/Check.vue';
import ContentSavePlus from 'vue-material-design-icons/ContentSavePlus.vue';
import Toast from 'primevue/toast';
import Button from 'primevue/button';
import { onMounted, ref } from 'vue';
import { useToast } from "primevue/usetoast";

export default {
    name: 'departments',
    setup() {
        const isLoading = ref(false);

        const departments = ref([
            {
                id: '1',
                name: 'Odjel 1',
                description: 'Opis odjela 1',
                manager: 'Ivan Horvat',
            },
            {
                id: '2',
                name: 'Odjel 2',
                description: 'Opis odjela 2',
                manager: 'Marija Marić',
            },
            {
                id: '3',
                name: 'Odjel 3',
                description: 'Opis odjela 3',
                manager: 'Ivan Horvat',
            },
            {
                id: '4',
                name: 'Odjel 4',
                description: 'Opis odjela 4',
                manager: 'Pero Perić',
            },
            {
                id: '5',
                name: 'Odjel 5',
                description: 'Opis odjela 5',
                manager: 'Ivan Horvat',
            },
            {
                id: '6',
                name: 'Odjel 6',
                description: 'Opis odjela 6',
                manager: 'Mato Matić',
            },
            {
                id: '7',
                name: 'Odjel 7',
                description: 'Opis odjela 7',
                manager: 'Ivan Horvat',
            },
        ]);

        // methods for editing
        const editingId = ref<string | null>(null);

        const activateEditing = (id: string) => {
            editingId.value = id;
        };

        const cancelEditing = () => {
            editingId.value = null;
        };

        const saveEditing = () => {
            editingId.value = null;
            showChangesSavedSuccessfully();
        };

        // methods for adding
        const isAddingActive = ref(false);

        const activateAdding = () => {
            isAddingActive.value = true;
        };

        const cancelAdding = () => {
            isAddingActive.value = false;
        };

        const saveNewdepartment = () => {

            isAddingActive.value = false;
            showSuccesfullyAddedNewdepartment();
        };

        /*************** toast ****************/
        const toast = useToast();

        const showChangesSavedSuccessfully = () => {
            toast.add({ severity: 'success', summary: 'Uspjeh', detail: 'Promjene spremljene.', life: 3000 });
        };

        const showSuccesfullyAddedNewdepartment = () => {
            toast.add({ severity: 'success', summary: 'Uspjeh', detail: 'Novo odjel uspješno dodan.', life: 3000 });
        };
        /**************toast END***************/

        onMounted(() => {

        });

        return {
            departments, isLoading, editingId, activateEditing, cancelEditing, saveEditing, isAddingActive, activateAdding, cancelAdding, saveNewdepartment
        };
    },
    components: {
        Pencil,
        DeleteOutline,
        VTextField,
        Close,
        Check,
        ContentSavePlus,
        Toast,
        Button,
        VCircularLoader
    },
};
</script>