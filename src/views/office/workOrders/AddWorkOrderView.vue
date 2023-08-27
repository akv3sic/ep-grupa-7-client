<template>
    <div class="flex flex-row justify-between items-center mb-6">
        <div class="flex-1 flex-col">
            <h2 class="font-medium text-xl">Dodaj novi radni nalog</h2>
            <p class="text-blue-500">Dodaj novi radni nalog u sustav</p>
        </div>
        <div class="flex-1 flex-col text-right">
            <Button label="Natrag" icon="pi pi-arrow-left" class="p-button-secondary mt-2" @click="$router.go(-1)" />
        </div>
    </div>

    <form @submit.prevent="addWorkOrder">

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-5 gap-6">
            <!-- Naslov -->
            <div class="md:mx-1">
                <span class="p-float-label">
                    <InputText id="title" v-model="order.title" class="w-full" />
                    <label for="title">Naslov</label>
                </span>
            </div>
            <!-- Dodijeljeno -->
            <div class="md:mx-1">
                <span class="p-float-label">
                    <Dropdown id="assigned_to" v-model="order.assigned_to" :options="employees" class="w-full"
                        :optionLabel="fullName" option-value="id" />
                    <label for="assigned_to">Dodijeljeno</label>
                </span>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-5 gap-6">
            <!-- Rok izvršenja -->
            <div class="md:mx-1">
                <span class="p-float-label">
                    <InputText id="due_time" type="datetime-local" v-model="order.due_time" class="w-full" />
                    <label for="due_time">Rok izvršenja</label>
                </span>
            </div>
            <!-- Radni centar -->
            <div class="md:mx-1">
                <span class="p-float-label">
                    <Dropdown id="work_center" v-model="order.work_center" :options="workCenters" class="w-full"
                        optionLabel="name" option-value="id" />
                    <label for="work_center">Radni centar</label>
                </span>
            </div>
            <!-- Kategorija -->
            <div class="md:mx-1">
                <span class="p-float-label">
                    <Dropdown id="category" v-model="order.category" :options="categories" class="w-full" optionLabel="name"
                        option-value="id" />
                    <label for="category">Kategorija</label>
                </span>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-5 gap-6">
            <!-- Opis -->
            <div class="md:mx-1">
                <span class="p-float-label">
                    <InputTextarea id="description" v-model="order.description" class="w-full" rows="3" />
                    <label for="description">Opis</label>
                </span>
            </div>
        </div>

        <Button type="submit" label="Dodaj radni nalog" class="p-button-primary" />
    </form>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, computed } from 'vue';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import type { WorkOrderForCreation } from '@/models/workOrderForCreation.model';
import { useWorkOrderCategoriesStore } from '@/stores/workOrderCategories';
import { useWorkOrdersStore } from '@/stores/workOrders.store';
import { useWorkCentersStore } from '@/stores/workcenters';
import { useEmployeesStore } from '@/stores/employees.store';
import { storeToRefs } from 'pinia';
import { isoToDayMonthYearWithTime } from '@/utils/dateTimeUtils';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'AddNewWorkOrderView',
    components: {
        InputText,
        InputTextarea: Textarea,
        Dropdown,
        Button
    },
    setup() {
        const toast = useToast();
        const router = useRouter();

        // work order categories store
        const workOrderCategoriesStore = useWorkOrderCategoriesStore();
        const { workOrderCategories: categories } = storeToRefs(workOrderCategoriesStore);

        // work centers store
        const workCentersStore = useWorkCentersStore();
        const { workCenters } = storeToRefs(workCentersStore);

        // work orders store
        const workOrdersStore = useWorkOrdersStore();

        // employees store
        const employeesStore = useEmployeesStore();
        const { employees } = storeToRefs(employeesStore);

        const fullName = computed(() => {
            return (employee: any) => {
                return employee.first_name + ' ' + employee.last_name;
            };
        });

        const order = ref<WorkOrderForCreation>({
            title: '',
            description: '',
            due_time: '',
            work_center: null,
            category: null,
            assigned_to: null
        });

        const addWorkOrder = async () => {
            order.value.due_time = isoToDayMonthYearWithTime(order.value.due_time);
            const success = await workOrdersStore.addWorkOrder(order.value);
            if (success) {
                toast.add({
                    severity: 'success',
                    summary: 'Uspjeh',
                    detail: 'Radni nalog je uspješno dodan',
                    life: 3000
                });
                router.push('/office/radni-nalozi');
            } else {
                toast.add({
                    severity: 'error',
                    summary: 'Greška',
                    detail: 'Radni nalog nije dodan',
                    life: 3000
                });
            }
        }

        onMounted(() => {
            workOrderCategoriesStore.fetchWorkOrderCategories();
            workCentersStore.fetchWorkCenters();
            employeesStore.fetchEmployees();
        });

        return {
            order,
            workCenters,
            categories,
            addWorkOrder,
            employees,
            fullName
        };
    }
});
</script>

<style scoped></style>
