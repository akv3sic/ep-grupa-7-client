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
            <Button label="Dodaj zaposlenika" icon="pi pi-plus" size="small"
                @click="$router.push('/office/dodaj-zaposlenika')" />
            <!-- search employees  -->
            <InputText placeholder="Traži zaposlenika" class="p-inputtext-sm md:!ml-2 -mr-1" @focus="openSearchModal" />
        </div>
    </div>

    <!-- search modal  -->
    <Dialog v-model:visible="isModalVisible" modal class="w-10/12 sm:w-8/12 md:w-4/12" closeOnEscape :show-header="true"
        :style="{ 'border-radius': '0.5rem' }">
        <template #header>
            <div class="flex flex-row w-full pr-4">
                <InputText placeholder="Traži po imenu i/ili prezimenu" class="w-full" v-model="searchQuery" clear />
            </div>
        </template>
        <div class="flex flex-col">
            <!-- recent searches -->
            <div class="flex flex-col" v-if="searchQuery.length == 0">
                <div class="flex flex-row justify-between items-center">
                    <h3 class="font-medium text-sm text-blue-500">Nedavne pretrage</h3>
                </div>
                <div class="flex flex-col mt-2">
                    <div class="flex flex-row justify-between items-center hover:bg-blue-100 p-2 rounded-md my-1"
                        v-for="(recentSearch, index) in recentSearches" :key="index">

                        <div class="flex">
                            <History fillColor="#6B7280" />
                            <span class="m-1 font-medium text-sm text-gray-500">
                                {{ recentSearch.first_name + ' ' + recentSearch.last_name + ' - ' +
                                    recentSearch.department }}
                            </span>
                        </div>
                        <span class="text-sm cursor-pointer">
                            <CloseCircleOutline fillColor="#6B7280" />
                        </span>
                    </div>
                </div>
            </div>

            <!-- search results -->
            <div class="flex flex-col mt-4" v-if="employeesSearchResults.length > 0">
                <div class="flex flex-row justify-between items-center">
                    <h3 class="font-medium text-sm text-blue-500">Rezultati pretrage</h3>
                </div>
                <div class="flex flex-col mt-2">
                    <div v-for="(searchResult, index) in employeesSearchResults">
                        <router-link :to="'zaposlenik/' + searchResult.id"
                            class="flex flex-row justify-between items-center hover:bg-blue-100 p-2 rounded-md my-1">
                            <div class="flex">
                                <FileAccount fillColor="#6B7280" />
                                <span class="m-1 font-medium text-sm text-gray-500">
                                    {{ searchResult.first_name + ' ' + searchResult.last_name + ' - ' +
                                        searchResult.department }}
                                </span>
                            </div>
                            <span class="text-sm cursor-pointer">
                                <KeyboardReturn fillColor="#6B7280" />
                            </span>
                        </router-link>
                    </div>
                </div>
            </div>

            <!-- no results -->
            <div class="flex flex-col mt-4" v-if="employeesSearchResults.length == 0 && searchQuery.length != 0">
                <div class="flex flex-col justify-center items-center">
                    <AlertCirleOutline fillColor="#6B7280" class="mb-5" :size="45" />
                    <h3 class="font-medium text-sm text-gray-500">
                        Nema rezultata pretrage za "
                        <span class="font-bold">
                            {{ searchQuery }}
                        </span>
                        "
                    </h3>
                </div>
            </div>
        </div>
    </Dialog>

    <!-- filters -->
    <div class="flex">
        <div class="flex-1 flex-row align-center mt-4">
            <!-- filter by department -->
            <Dropdown optionValue="id" optionLabel="name" placeholder="Filtriraj po odjelu" showClear
                class="w-full md:w-1/3 lg:w-1/6 m-1" :options="departments" />
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
import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog';
import CloseCircleOutline from 'vue-material-design-icons/CloseCircleOutline.vue';
import History from 'vue-material-design-icons/History.vue';
import KeyboardReturn from 'vue-material-design-icons/KeyboardReturn.vue';
import FileAccount from 'vue-material-design-icons/FileAccount.vue';
import AlertCirleOutline from 'vue-material-design-icons/AlertCircleOutline.vue';
import { ref, onMounted } from 'vue';
import { useDepartmentsStore } from '@/stores/departments';
import { storeToRefs } from 'pinia';

export default {
    name: 'EmployeesListView',
    setup() {
        const employees = ref([
            {
                first_name: 'Mate',
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


        /* departments */
        const departmentsStore = useDepartmentsStore();
        const { departments } = storeToRefs(departmentsStore);

        /* search employees */
        const searchQuery = ref('');
        const isModalVisible = ref(false);

        const openSearchModal = () => {
            isModalVisible.value = true;
        };

        const closeSearchModal = () => {
            isModalVisible.value = false;
        };

        const recentSearches = ref([
            {
                "id": "sam2i92ndajd",
                "first_name": "John",
                "last_name": "Doe",
                "department": "IT",
            },
            {
                "id": "sam2i92ndajd",
                "first_name": "John",
                "last_name": "Doe",
                "department": "IT",
            },
            {
                "id": "sam2i92ndajd",
                "first_name": "John",
                "last_name": "Doe",
                "department": "IT",
            }
        ]);

        const employeesSearchResults = ref([
            {
                "id": "sam2i92ndajd",
                "first_name": "John",
                "last_name": "Doe",
                "department": "IT",
            },
            {
                "id": "sam2i92ndajd",
                "first_name": "John",
                "last_name": "Doe",
                "department": "IT",
            },
            {
                "id": "sam2i92ndajd",
                "first_name": "John",
                "last_name": "Doe",
                "department": "IT",
            }
        ]);

        /* search employees end*/

        onMounted(() => {
            departmentsStore.fetchDepartments();
            console.log(departments.value);
        })

        return {
            employees, searchQuery, isModalVisible, openSearchModal, closeSearchModal, recentSearches, employeesSearchResults, departments
        }
    },
    components: {
        InputText, Button, DeleteOutline, AccountDetails, Paginator, Dropdown, Dialog, CloseCircleOutline, History, KeyboardReturn, FileAccount, AlertCirleOutline,
    },
}
</script>

<style scoped>
.p-inputtext-sm {
    height: 2.7rem;
}
</style>