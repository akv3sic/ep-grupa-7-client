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
                    <Dropdown id="work_center" v-model="order.work_center" :options="workCenters" class="w-full" />
                    <label for="work_center">Radni centar</label>
                </span>
            </div>
            <!-- Kategorija -->
            <div class="md:mx-1">
                <span class="p-float-label">
                    <Dropdown id="category" v-model="order.category" :options="categories" class="w-full" optionLabel="name" option-value="id" />
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
import { ref, defineComponent, onMounted } from 'vue';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import type { WorkOrderForCreation } from '@/models/workOrderForCreation.model';
import { useWorkOrderCategoriesStore } from '@/stores/workOrderCategories';
import { storeToRefs } from 'pinia';

export default defineComponent({
    name: 'AddNewWorkOrderView',
    components: {
        InputText,
        InputTextarea: Textarea,
        Dropdown,
        Button
    },
    setup() {
        // work order categories store
        const workOrderCategoriesStore = useWorkOrderCategoriesStore();
        const { workOrderCategories: categories } = storeToRefs(workOrderCategoriesStore);



        const order = ref<WorkOrderForCreation>({
            title: '',
            description: '',
            due_time: '',
            work_center: '',
            category: ''
        });

        const workCenters = ['Center1', 'Center2'];

        function addWorkOrder() {
            console.log('Dodaj radni nalog s informacijama:', order.value);
        }

        onMounted(() => {
            workOrderCategoriesStore.fetchWorkOrderCategories();
        });

        return {
            order,
            workCenters,
            categories,
            addWorkOrder
        };
    }
});
</script>

<style scoped></style>
