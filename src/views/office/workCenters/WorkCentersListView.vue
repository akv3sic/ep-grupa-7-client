<template>
    <!-- page header  -->
    <div class="flex flex-col">
        <div class="flex flex-row">
            <div class="flex-1 flex-col">
                <h2 class="font-medium text-xl ">Radni centri</h2>
                <!-- page description  -->
                <p class="text-blue-500">Pregled radnih centara</p>
            </div>
            <div class="flex-1 flex-col">
                <Button label="Dodaj radni centar" icon="pi pi-plus" size="small" @click="activateAdding"
                    v-if="!isAddingActive"></Button>
            </div>
        </div>

        <!-- inline adding of new workCenter -->
        <div class="grid grid-cols-2 lg:grid-cols-4 mt-2 pl-2 shadow" v-if="isAddingActive">
            <div class="py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                <VTextField label="Naziv" />
            </div>
            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                <VTextField label="Opis" />
            </div>
            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                <Dropdown :options="departments" optionLabel="name" placeholder="Odjel" />
            </div>
            <!-- actions -->
            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                <span>
                    <span class="text-xs text-gray-400 lg:hidden">Akcije:</span>
                    <span class="flex">
                        <ContentSavePlus fillColor="green" @click="addNew" />
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
                        <div class="px-6 py-3">Odjel</div>
                        <div class="px-6 py-3"></div>
                    </div>
                </div>
                <!-- table body -->
                <div class="bg-white divide-y divide-gray-200" v-if="!isLoading">
                    <template v-for="(workCenter, index) in workCenters" :key="index">

                        <!-- normal view -->
                        <div class="grid grid-cols-2 lg:grid-cols-4" v-if="editingId != workCenter.id">
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden">Naziv:</span>
                                <span>{{ workCenter.name }}</span>
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden">Opis:</span>
                                <span v-tooltip="workCenter.description">{{ truncateDescription(workCenter.description) }}</span>
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden">Odjel:</span>
                                <span>{{ workCenter.department.name }}</span>
                            </div>
                            <!-- actions -->
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span>
                                    <span class="text-xs text-gray-400 lg:hidden">Akcije:</span>
                                    <span class="flex">
                                        <Pencil @click="activateEditing(workCenter.id)" />
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
                                <VTextField label="Odjel" />
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
import Dropdown from 'primevue/dropdown';
import { onMounted, ref } from 'vue';
import { useToast } from "primevue/usetoast";
import { useWorkCentersStore } from '@/stores/workcenters';
import { storeToRefs } from 'pinia';
import type { WorkCenter } from '@/models/workcenter.model';

export default {
    name: 'WorkCenters',
    setup() {
        const workCentersStore = useWorkCentersStore();
        const { workCenters, isLoading } = storeToRefs(workCentersStore);

        const departments = ref([
            {
                id: '1',
                name: 'Odjel 1'
            },
            {
                id: '2',
                name: 'Odjel 2'
            },
            {
                id: '3',
                name: 'Odjel 3'
            },
        ]);

        // methods and variables for inline editing
        const editingId = ref<number | null>(null);

        const activateEditing = (id: number) => {
            editingId.value = id;
        };

        const cancelEditing = () => {
            editingId.value = null;
        };

        const saveEditing = () => {
            editingId.value = null;
            showChangesSavedSuccessfully();
        };

        // methods and variables for adding new
        const isAddingActive = ref(false);

        const activateAdding = () => {
            isAddingActive.value = true;
        };

        const cancelAdding = () => {
            isAddingActive.value = false;
        };

        const addNew = () => {
            isAddingActive.value = false;
            showSuccesfullyAddedNewWorkCenter();
        };

        /*************** toast ****************/
        const toast = useToast();

        const showChangesSavedSuccessfully = () => {
            toast.add({ severity: 'success', summary: 'Uspjeh', detail: 'Promjene spremljene.', life: 3000 });
        };

        const showSuccesfullyAddedNewWorkCenter = () => {
            toast.add({ severity: 'success', summary: 'Uspjeh', detail: 'Novi centar uspješno dodan.', life: 3000 });
        };
        /**************toast END***************/

        onMounted(() => {
            workCentersStore.fetchWorkCenters();
        });

        const truncateDescription = (description: string) => {
            return description.length > 30 ? description.substring(0, 30) + '...' : description;
        };

        return {
            workCenters, isLoading, editingId, activateEditing, cancelEditing, saveEditing, isAddingActive, activateAdding, cancelAdding, addNew, departments, truncateDescription
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
        VCircularLoader,
        Dropdown
    },
};
</script>