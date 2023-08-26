<template>
    <!-- page header  -->
    <div class="flex flex-col">
        <div class="flex flex-row">
            <div class="flex-1 flex-col">
                <h2 class="font-medium text-xl ">Radna mjesta</h2>
                <!-- page description  -->
                <p class="text-blue-500">Pregled radnih mjesta</p>
            </div>
            <div class="flex-1 flex-col">
                <Button label="Dodaj radno mjesto" icon="pi pi-plus" size="small" @click="activateAdding"
                    v-if="!isAddingActive"></Button>
            </div>
        </div>

        <!-- inline adding of new workplace -->
        <div class="grid grid-cols-2 lg:grid-cols-4 mt-2 pl-2 shadow" v-if="isAddingActive">
            <div class="py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                <VTextField label="Naziv" :input-value="newWorkplace.name"
                    @update:input-value="newValue => newWorkplace.name = newValue" />
            </div>
            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                <VTextField label="Šifra" :input-value="newWorkplace.code"
                    @update:input-value="newValue => newWorkplace.code = newValue" />
            </div>
            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                <VTextField label="Bodovi" :input-value="newWorkplace.points"
                    @update:input-value="newValue => newWorkplace.points = newValue" />
            </div>
            <!-- actions -->
            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                <span>
                    <span class="text-xs text-gray-400 lg:hidden">Akcije:</span>
                    <span class="flex">
                        <ContentSavePlus fillColor="green" @click="saveNewWorkplace" />
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
                        <div class="px-6 py-3">Šifra</div>
                        <div class="px-6 py-3">Bodovi</div>
                        <div class="px-6 py-3"></div>
                    </div>
                </div>
                <!-- table body -->
                <div class="bg-white divide-y divide-gray-200" v-if="!isLoading">
                    <template v-for="(workplace, index) in workplaces" :key="index">

                        <!-- normal view -->
                        <div class="grid grid-cols-2 lg:grid-cols-4" v-if="editingId != workplace.id">
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden">Naziv:</span>
                                <span>{{ workplace.name }}</span>
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden">Šifra:</span>
                                <span>{{ workplace.code }}</span>
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden">Bodovi:</span>
                                <span>{{ workplace.points }}</span>
                            </div>
                            <!-- actions -->
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span>
                                    <span class="text-xs text-gray-400 lg:hidden">Akcije:</span>
                                    <span class="flex">
                                        <template v-if="deletingId !== workplace.id">
                                            <Pencil @click="activateEditing(workplace.id)" />
                                            <DeleteOutline @click="confirmDeleteWorkplace(workplace.id)" />
                                        </template>
                                        <template v-else>
                                            <!-- delete confirmation -->
                                            <span class="font-semibold mr-1">Sigurno?</span>
                                            <Check fillColor="green" @click="executeDeleteWorkplace(workplace.id)" />
                                            <Close fillColor="red" @click="cancelDelete" />
                                        </template>
                                    </span>
                                </span>
                            </div>
                        </div>

                        <!-- inline editing -->
                        <div class="grid grid-cols-2 lg:grid-cols-4" v-else>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <VTextField label="Naziv" :input-value="editedWorkplace.name"
                                    @update:input-value="newValue => editedWorkplace.name = newValue" />
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <VTextField label="Šifra" :input-value="editedWorkplace.code"
                                    @update:input-value="newValue => editedWorkplace.code = newValue" />
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <VTextField label="Bodovi" :input-value="editedWorkplace.points"
                                    @update:input-value="newValue => editedWorkplace.points = newValue" />
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
import { useWorkplacesStore } from '@/stores/workplaces';
import { storeToRefs } from 'pinia';
import type { WorkplaceForCreation } from '@/models/workplaceForCreation.model';
import type { Workplace } from '@/models/workplace.model';

export default {
    name: 'Workplaces',
    setup() {
        const workplacesStore = useWorkplacesStore();
        const { workplaces, isLoading } = storeToRefs(workplacesStore);

        // editing
        const editedWorkplace = ref<Workplace>({ id: 0, name: '', code: '', points: '', is_deleted: false });
        const editingId = ref<number | null>(null);
        const activateEditing = (id: number) => {
            const wp = workplaces.value.find(w => w.id === id);
            if (wp) {
                editedWorkplace.value = { ...wp };
                editingId.value = id;
            }
        };
        const cancelEditing = () => {
            editingId.value = null;
        };

        const saveEditing = () => {
            workplacesStore.updateWorkplace(editedWorkplace.value);
            editingId.value = null;
            showChangesSavedSuccessfully();
        };

        // adding
        const isAddingActive = ref(false);

        const activateAdding = () => {
            isAddingActive.value = true;
        };

        const cancelAdding = () => {
            isAddingActive.value = false;
        };

        const newWorkplace = ref<WorkplaceForCreation>({
            name: '',
            code: '',
            points: ''
        });

        const saveNewWorkplace = () => {
            workplacesStore.addWorkplace(newWorkplace.value);
            isAddingActive.value = false;
            showSuccesfullyAddedNewWorkplace();
            // clear newWorkplace
            newWorkplace.value = {
                name: '',
                code: '',
                points: ''
            };
        };

        // delete confirmation
        const deletingId = ref<number | null>(null);

        const confirmDeleteWorkplace = (id: number) => {
            deletingId.value = id;
        };

        const executeDeleteWorkplace = async (id: number) => {
            const isDeleted = await workplacesStore.deleteWorkplace(id);

            // Check the result and show corresponding toast.
            if (isDeleted) {
                toast.add({ severity: 'success', summary: 'Uspjeh', detail: 'Radno mjesto uspješno obrisano.', life: 3000 });
            } else {
                toast.add({ severity: 'error', summary: 'Greška', detail: 'Neuspješno brisanje radnog mjesta.', life: 3000 });
            }

            // Clear the deletingId.
            deletingId.value = null;
        };



        const cancelDelete = () => {
            deletingId.value = null;
        };


        /*************** toast ****************/
        const toast = useToast();

        const showChangesSavedSuccessfully = () => {
            toast.add({ severity: 'success', summary: 'Uspjeh', detail: 'Promjene spremljene.', life: 3000 });
        };

        const showSuccesfullyAddedNewWorkplace = () => {
            toast.add({ severity: 'success', summary: 'Uspjeh', detail: 'Novo radno mjesto uspješno dodano.', life: 3000 });
        };
        /**************toast END***************/

        onMounted(() => {
            workplacesStore.fetchWorkplaces();
        });

        return {
            workplaces, isLoading, editingId, activateEditing, cancelEditing, saveEditing, isAddingActive, activateAdding,
            cancelAdding, saveNewWorkplace, newWorkplace, editedWorkplace,
            confirmDeleteWorkplace, executeDeleteWorkplace, cancelDelete, deletingId
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