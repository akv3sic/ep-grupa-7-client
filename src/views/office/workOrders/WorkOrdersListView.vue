<template>
    <!-- page header  -->
    <div class="flex flex-col">
        <div class="flex flex-row">
            <div class="flex-1 flex-col">
                <h2 class="font-medium text-xl ">Radni nalozi</h2>
                <!-- page description  -->
                <p class="text-blue-500">Pregled radnih naloga</p>
            </div>
            <div class="flex-1 flex-col">
                <Button label="Novi nalog" icon="pi pi-plus" size="small" @click="$router.push('/office/dodaj-radni-nalog')"
                    class="p-button-primary mt-2" />
            </div>
        </div>
    </div>

    <div class="flex flex-col mt-4">
        <div class="overflow-x-auto">
            <div class="shadow overflow-hidden sm:rounded-lg">
                <!-- tab menu -->
                <div class="mt-4">
                    <TabMenu :model="tabMenuItems" v-model:activeIndex="activeTab" />
                </div>
                <!-- table header -->
                <div class="bg-gray-50 hidden lg:block" v-if="!isLoadingWorkOrders">
                    <div class="grid grid-cols-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div class="px-6 py-3">#</div>
                        <div class="px-6 py-3">Naziv</div>
                        <div class="px-6 py-3">Status</div>
                        <div class="px-6 py-3">Radni centar</div>
                        <div class="px-6 py-3">Dodijeljeno</div>
                        <div class="px-6 py-3"></div>
                    </div>
                </div>
                <!-- table body -->
                <div class="bg-white divide-y divide-gray-200" v-if="!isLoadingWorkOrders">
                    <template v-for="(workOrder, index) in filteredWorkOrders" :key="index">

                        <div class="grid grid-cols-2 lg:grid-cols-6">
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden">#:</span>
                                <span>{{ workOrder.id }}</span>
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden">Naziv:</span>
                                <span>{{ workOrder.title }}</span>
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden">Status:</span>
                                <span>{{ workOrder.status }}</span>
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden">Radni centar:</span>
                                <span>{{ workOrder.work_center }}</span>
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden">Dodijeljeno:</span>

                                <div class="flex flex-row items-center hover:border border-gray-400 transition duration-300 ease-in-out p-1"
                                    v-if="!isAssigneeChangeActive" @click="isAssigneeChangeActive = true">
                                    <!-- badge with initials -->
                                    <span
                                        :class="['w-8', 'h-8', 'text-white', 'rounded-full', 'flex', 'items-center', 'justify-center', 'mr-2', 'font-bold', 'text-sm', getColorForUser(workOrder.assigned_to)]">
                                        {{ fullNameToInitials(workOrder.assigned_to) }}
                                    </span>

                                    <!-- full name of assigned user -->
                                    <span>{{ workOrder.assigned_to }}</span>
                                </div>

                                <!-- dropdown for assignee change -->
                                <Dropdown v-else class="w-full" :options="employees" :optionLabel="fullName"
                                    optionValue="id" :filter="true" filterPlaceholder="Pretraži" placeholder="Odaberi" />

                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden">Akcije:</span>
                                <Button v-if="workOrder.status === 'Novi'" v-tooltip="'Prebaci u aktivne'"
                                    icon="pi pi-power-off" class="p-button-text p-button-secondary p-button-sm"
                                    @click="activateWorkOrder(workOrder)" title="Aktiviraj" />
                                <Button v-else v-tooltip="'Prebaci u završene'" icon="pi pi-check"
                                    class="p-button-text p-button-secondary p-button-sm" title="Završi" />
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
import VCircularLoader from '@/components/base/VCircularLoader.vue';
import Button from 'primevue/button';
import TabMenu from 'primevue/tabmenu';
import { ref, onMounted, watchEffect, computed } from 'vue';
import { useWorkOrdersStore } from '@/stores/workOrders.store';
import { storeToRefs } from 'pinia';
import type { WorkOrder } from '@/models/workOrder.model';
import { fullNameToInitials } from '@/utils/stringUtils';
import Dropdown from 'primevue/dropdown';
import { useEmployeesStore } from '@/stores/employees.store';
import type { WorkOrderForCreation } from '@/models/workOrderForCreation.model';

export default {
    name: 'WorkOrders',
    setup() {
        /**
         * work orders store
         */

        const workOrdersStore = useWorkOrdersStore();
        const { isLoading: isLoadingWorkOrders, workOrders } = storeToRefs(workOrdersStore);

        const filteredWorkOrders = ref<WorkOrder[]>([]);

        /**
         * employees store
         */
        const employeesStore = useEmployeesStore();
        const { employees } = storeToRefs(employeesStore);

        const fullName = computed(() => {
            return (employee: any) => {
                return employee.first_name + ' ' + employee.last_name;
            };
        });

        // logic for assignee change
        const isAssigneeChangeActive = ref(false);

        // activate work order
        const activateWorkOrder = (workOrder: WorkOrder) => {
            console.log(workOrder);
        };


        /**
         * tab menu
         */
        const activeTab = ref(0);

        const tabMenuItems = ref([
            { label: 'Novi', icon: 'pi pi-fw pi-plus' },
            { label: 'Aktivni', icon: 'pi pi-fw pi-cog' },
            { label: 'Završeni', icon: 'pi pi-fw pi-check' }
        ]);

        // watch for tab menu changes and filter work orders
        watchEffect(() => {
            switch (activeTab.value) {
                case 0:
                    filteredWorkOrders.value = workOrders.value.filter((workOrder) => workOrder.status === 'Novi');
                    break;
                case 1:
                    filteredWorkOrders.value = workOrders.value.filter((workOrder) => workOrder.status === 'Aktivni');
                    break;
                case 2:
                    filteredWorkOrders.value = workOrders.value.filter((workOrder) => workOrder.status === 'Završeni');
                    break;
            }
        });

        /**
         * get random color for badge
         */
        const getColorForUser = (name: string): string => {
            const colors = [
                'bg-blue-500',
                'bg-red-500',
                'bg-green-500',
                'bg-yellow-500',
                'bg-indigo-500'
            ];
            let hash = 0;
            for (let i = 0; i < name.length; i++) {
                hash = name.charCodeAt(i) + ((hash << 5) - hash);
            }
            const index = Math.abs(hash) % colors.length;
            return colors[index];
        }



        /**
         * fetch work orders
         */
        onMounted(() => {
            workOrdersStore.fetchWorkOrders();
            employeesStore.fetchEmployees();
        });

        return {
            isLoadingWorkOrders,
            filteredWorkOrders,
            activeTab,
            tabMenuItems,
            fullNameToInitials,
            getColorForUser,
            isAssigneeChangeActive,
            employees,
            fullName,
            activateWorkOrder
        };
    },
    components: {
        VCircularLoader,
        Button,
        TabMenu,
        Dropdown
    }
};
</script>