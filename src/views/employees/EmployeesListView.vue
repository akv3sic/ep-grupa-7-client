<template>
    <!-- page header  -->
    <div class="flex flex-col md:flex-row">
        <div class="flex-1 flex-col">
            <div class="flex flex-row">
                <h2 class="font-medium text-xl ">Zaposlenici</h2>
                <!-- total item count  -->
                <span class="text-gray-500 ml-2 text-xl" v-if="employees.length > 0">({{ employees.length }})</span>
            </div>
            <!-- description  -->
            <p class="text-blue-500">Pregled svih zaposlenika</p>
        </div>
        <div class="flex flex-row m-1 justify-between">
            <!-- actions  -->
            <Button label="Dodaj zaposlenika" icon="pi pi-plus" size="small"></Button>
            <!-- search employees  -->
            <InputText placeholder="Traži zaposlenika" class="p-inputtext-sm md:!ml-2 -mr-1" />
        </div>
    </div>

    <!-- table  -->
    <div class="flex flex-col mt-4">
        <div class="overflow-x-auto">
            <div class="shadow overflow-hidden sm:rounded-lg">

                <!-- table header -->
                <div class="bg-gray-50 hidden lg:block" v-if="employees.length > 0">
                    <div class="grid grid-cols-9 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div class="px-6 py-3">Ime</div>
                        <div class="px-6 py-3">Prezime</div>
                        <div class="px-6 py-3">Ime oca</div>
                        <div class="px-6 py-3">Broj mobitela</div>
                        <div class="px-6 py-3">Datum rođenja</div>
                        <div class="px-6 py-3">Odjel</div>
                        <div class="px-6 py-3">Grad</div>
                        <div class="px-6 py-3"></div>
                    </div>
                </div>

                <!-- table body -->
                <div class="bg-white divide-y divide-gray-200">
                    <template v-for="(employee, index) in employees" :key="index">
                        <div class="grid grid-cols-2 lg:grid-cols-9">
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden">Ime:</span>
                                <span class="label">{{ employee.first_name }}</span>
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden">Prezime:</span>
                                <span class="label">{{ employee.last_name }}</span>
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden">Ime oca:</span>
                                <span class="label">{{ employee.father_name }}</span>
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden">E-mail:</span>
                                <span class="label">{{ employee.email }}</span>
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden">Datum rođenja:</span>
                                <span class="label">{{ employee.date_of_birth }}</span>
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden">Odjel:</span>
                                <span class="label">{{ employee.department }}</span>
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden">Grad:</span>
                                <span class="label">{{ employee.city }}</span>
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden">Akcije</span>
                                <span class="flex">
                                    <DeleteOutline />
                                    <RouterLink :to="'/zaposlenik/' + 'id'">
                                        <AccountDetails />
                                    </RouterLink>
                                </span>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
    <Paginator :rows="6" :totalRecords="50" :rowsPerPageOptions="[6, 10, 15]" class="mt-4"></Paginator>
</template>

<script lang="ts">
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import DeleteOutline from 'vue-material-design-icons/DeleteOutline.vue';
import AccountDetails from 'vue-material-design-icons/AccountDetails.vue';
import Paginator from 'primevue/paginator';
import { ref } from 'vue';

export default {
    name: 'EmployeesListView',
    setup() {
        const employees = ref([
            {
                first_name: 'Ivan',
                last_name: 'Ivić',
                father_name: 'Ivo',
                email: 'ivo@test.mail',
                date_of_birth: '01.01.1990.',
                department: 'Odjel 1',
                city: 'Zagreb',
            },
            {
                first_name: 'Marko',
                last_name: 'Markić',
                father_name: 'Marko',
                email: 'marko@test.mail',
                date_of_birth: '01.01.1990.',
                department: 'Odjel 2',
                city: 'Zagreb',
            },
            {
                first_name: 'Pero',
                last_name: 'Perić',
                father_name: 'Ivo',
                email: 'pero@test.mail',
                date_of_birth: '01.01.1990.',
                department: 'Odjel 2',
                city: 'Široki Brijeg',
            },
            {
                first_name: 'Ana',
                last_name: 'Anić',
                father_name: 'Stipe',
                email: 'ana@test.mail',
                date_of_birth: '01.01.1990.',
                department: 'Odjel 1',
                city: 'Mostar',
            },
            {
                first_name: 'Ivan',
                last_name: 'Ivić',
                father_name: 'Ivo',
                email: 'ivo@test.mail',
                date_of_birth: '01.01.1990.',
                department: 'Odjel 1',
                city: 'Zagreb',
            },
            {
                first_name: 'Marko',
                last_name: 'Markić',
                father_name: 'Marko',
                email: 'marko@test.mail',
                date_of_birth: '01.01.1990.',
                department: 'Odjel 2',
                city: 'Zagreb',
            },
        ]);

        return {
            employees,
        }
    },
    components: {
        InputText, Button, DeleteOutline, AccountDetails, Paginator,
    },
}
</script>

<style scoped>
.p-inputtext-sm {
    height: 2.7rem;
}
</style>