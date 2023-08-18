<template>
    <div class="flex flex-row justify-between items-center mb-6">
        <div class="flex-1 flex-col">
            <h2 class="font-medium text-xl ">Dodaj novog zaposlenika</h2>
            <p class="text-blue-500">Dodaj novog zaposlenika u sustav</p>
        </div>
        <div class="flex-1 flex-col text-right">
            <Button label="Natrag" icon="pi pi-arrow-left" class="p-button-secondary mt-2" @click="$router.go(-1)" />
        </div>
    </div>

    <form @submit.prevent="addEmployee">
        <h3 class="mt-2 font-medium text-gray-700">Opći podatci</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-5 gap-6">
            <div class="md:mx-1">
                <span class="p-float-label">
                    <InputText id="first_name" v-model="user.first_name" class="w-full" />
                    <label for="first_name">Ime</label>
                </span>
            </div>
            <div class="md:mx-1">
                <span class="p-float-label">
                    <InputText id="last_name" v-model="user.last_name" class="w-full" />
                    <label for="last_name">Prezime</label>
                </span>
            </div>
            <div class="md:mx-1">
                <span class="p-float-label">
                    <InputText id="father_name" v-model="user.father_name" class="w-full" />
                    <label for="father_name">Ime oca</label>
                </span>
            </div>
            <div class="md:mx-1">
                <span class="p-float-label">
                    <InputText id="date_of_birth" type="date" v-model="user.date_of_birth" class="w-full" />
                    <label for="date_of_birth">Datum rođenja</label>
                </span>
            </div>
            <div class="md:mx-1">
                <span class="p-float-label">
                    <InputText id="city" v-model="user.city" class="w-full" />
                    <label for="city">Grad</label>
                </span>
            </div>
        </div>

        <h3 class="mt-2 font-medium text-gray-700">Podatci o zaposlenju</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-5 gap-6">
            <div class="md:mx-1">
                <span class="p-float-label">
                    <InputText id="job_title" v-model="user.job_title" class="w-full" />
                    <label for="job_title">Pozicija</label>
                </span>
            </div>
            <div class="md:mx-1">
                <span class="p-float-label">
                    <Dropdown id="workplace" v-model="user.workplace" :options="workplaces" class="w-full" />
                    <label for="workplace">Radno mjesto</label>
                </span>
            </div>
            <div class="md:mx-1">
                <span class="p-float-label">
                    <Dropdown id="workcenter" v-model="user.workcenter" :options="workcenters" class="w-full" />
                    <label for="workcenter">Radni centar</label>
                </span>
            </div>
        </div>

        <Button type="submit" label="Dodaj zaposlenika" class="p-button-primary" />

    </form>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import type { EmployeeForCreation } from '@/models/employeeForCreation.model';

export default defineComponent({
    name: 'AddNewEmployeeView',
    components: {
        InputText,
        Dropdown,
        Button
    },
    setup() {
        const user = ref<EmployeeForCreation>({
            first_name: '',
            last_name: '',
            father_name: '',
            date_of_birth: '',
            city: '',
            job_title: '',
            rfid_uid: '',
            workplace: '',
            workcenter: ''
        });

        const workplaces = ['Option1', 'Option2'];
        const workcenters = ['Option1', 'Option2'];

        function addEmployee() {
            console.log('Dodaj zaposlenika s informacijama:', user.value);
        }

        return {
            user,
            workplaces,
            workcenters,
            addEmployee
        };
    }
});
</script>

<style scoped></style>
