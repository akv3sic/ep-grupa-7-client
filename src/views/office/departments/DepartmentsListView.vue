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
                                <span v-tooltip="department.description">{{
                                    truncateDescription(department.description) }}</span>
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden">Odgovorna osoba:</span>
                                <span>{{ department.manager.first_name + ' ' + department.manager.last_name }}</span>
                            </div>
                            <!-- actions -->
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span>
                                    <span class="text-xs text-gray-400 lg:hidden">Akcije:</span>
                                    <span class="flex">
                                        <template v-if="deletingId !== department.id">
                                            <Pencil @click="activateEditing(department.id)" />
                                            <DeleteOutline @click="confirmDeleteDepartment(department.id)" />
                                        </template>
                                        <template v-else>
                                            <!-- delete confirmation -->
                                            <span class="font-semibold mr-1">Sigurno?</span>
                                            <Check fillColor="green" @click="executeDeleteDepartment(department.id)" />
                                            <Close fillColor="red" @click="cancelDelete" />
                                        </template>
                                    </span>
                                </span>
                            </div>
                        </div>

                        <!-- inline editing -->
                        <div class="grid grid-cols-2 lg:grid-cols-4" v-else>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <VTextField label="Naziv" :input-value="editedDepartment.name"
                                    @update:input-value="newValue => editedDepartment.name = newValue" />
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <VTextField label="Opis" :input-value="editedDepartment.description"
                                    @update:input-value="newValue => editedDepartment.description = newValue" />
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <Dropdown :options="employees" placeholder="Odgovorna osoba" :option-label="fullName"
                                    option-value="id" v-model="editedDepartment.manager.id" />
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
import { onMounted, ref, computed } from 'vue';
import { useToast } from "primevue/usetoast";
import { useDepartmentsStore } from '@/stores/departments';
import { storeToRefs } from 'pinia';
import { truncateDescription } from '@/utils/stringUtils';
import { useEmployeesStore } from '@/stores/employees.store';
import Dropdown from 'primevue/dropdown';
import type { DepartmentForUpdate } from '@/models/departmentForUpdate.model';

export default {
    name: 'departments',
    setup() {
        const departmentsStore = useDepartmentsStore();
        const { departments, isLoading } = storeToRefs(departmentsStore);

        const employeesStore = useEmployeesStore();
        const { employees, isLoading: isLoadingEmployees } = storeToRefs(employeesStore);

        // methods for editing
        const editingId = ref<number | null>(null);
        const editedDepartment = ref<any>(null);

        const activateEditing = (id: number) => {
            editingId.value = id;
            editedDepartment.value = departments.value.find((department: any) => department.id === id);
        };

        const cancelEditing = () => {
            editingId.value = null;
        };
        /**
         * Saves changes made to the department.
         */
        const saveEditing = async () => {
            const departmentToUpdate: DepartmentForUpdate = {
                id: editedDepartment.value.id,
                name: editedDepartment.value.name,
                description: editedDepartment.value.description,
                manager: editedDepartment.value.manager.id
            };
            const isUpdated = await departmentsStore.updateDepartment(departmentToUpdate);
            editingId.value = null;
            if (isUpdated) {
                showChangesSavedSuccessfully();
                departmentsStore.fetchDepartments();
            } else {
                toast.add({ severity: 'error', summary: 'Greška', detail: 'Greška. Promjene nisu spremljene.', life: 3000 });
            }
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

        // methods for deleting
        const deletingId = ref<number | null>(null);

        const confirmDeleteDepartment = (id: number) => {
            deletingId.value = id;
        };

        const executeDeleteDepartment = async (id: number) => {
            try {
                const isDeleted = await departmentsStore.deleteDepartment(id);
                if (isDeleted) {
                    toast.add({ severity: 'success', summary: 'Uspjeh', detail: 'Odjel uspješno izbrisan.', life: 3000 });
                } else {
                    toast.add({ severity: 'error', summary: 'Greška', detail: 'Greška. Odjel nije izbrisan.', life: 3000 });
                }
            } catch (error) {
                // Handle unexpected errors (network issues, server errors, etc.)
                toast.add({ severity: 'error', summary: 'Greška', detail: 'Došlo je do greške prilikom brisanja odjela.', life: 3000 });
            }
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

        const showSuccesfullyAddedNewdepartment = () => {
            toast.add({ severity: 'success', summary: 'Uspjeh', detail: 'Novo odjel uspješno dodan.', life: 3000 });
        };
        /**************toast END***************/

        // computed
        const fullName = computed(() => {
            return (employee: any) => {
                return employee.first_name + ' ' + employee.last_name;
            };
        });

        onMounted(() => {
            departmentsStore.fetchDepartments();
            employeesStore.fetchEmployees(null, "is_superuser");
        });

        return {
            departments, isLoading, editingId, activateEditing, cancelEditing, saveEditing, isAddingActive, activateAdding,
            cancelAdding, saveNewdepartment, truncateDescription, deletingId, confirmDeleteDepartment, executeDeleteDepartment, cancelDelete,
            employees, isLoadingEmployees, fullName, editedDepartment
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