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
                <VTextField label="Naziv" />
            </div>
            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                <VTextField label="Šifra" />
            </div>
            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                <VTextField label="Bodovi" />
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
                                <span>{{ workplace.workplaceName }}</span>
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden">Šifra:</span>
                                <span>{{ workplace.workplaceCode }}</span>
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden">Bodovi:</span>
                                <span>{{ workplace.workplacePoints }}</span>
                            </div>
                            <!-- actions -->
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span>
                                    <span class="text-xs text-gray-400 lg:hidden">Akcije:</span>
                                    <span class="flex">
                                        <Pencil @click="activateEditing(workplace.id)" />
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
                                <VTextField label="Šifra" />
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <VTextField label="Bodovi" />
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
    name: 'WorkplacesListView',
    setup() {
        const editingId = ref<string | null>(null);
        const isLoading = ref(false);

        const workplaces = ref([
            {
                id: '1',
                workplaceName: 'Radno mjesto 1',
                workplaceCode: 'RM1',
                workplacePoints: 10
            },
            {
                id: '2',
                workplaceName: 'Radno mjesto 2',
                workplaceCode: 'RM2',
                workplacePoints: 20
            },
            {
                id: '3',
                workplaceName: 'Radno mjesto 3',
                workplaceCode: 'RM3',
                workplacePoints: 30
            }
        ]);

        const isAddingActive = ref(false);

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

        const activateAdding = () => {
            isAddingActive.value = true;
        };

        const cancelAdding = () => {
            isAddingActive.value = false;
        };

        const saveNewWorkplace = () => {

            isAddingActive.value = false;
            showSuccesfullyAddedNewWorkplace();
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

        });

        return {
            workplaces, isLoading, editingId, activateEditing, cancelEditing, saveEditing, isAddingActive, activateAdding, cancelAdding, saveNewWorkplace
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