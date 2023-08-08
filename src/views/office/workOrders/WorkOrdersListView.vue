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
                <Button label="Add new work order" icon="pi pi-plus" size="small"></Button>
            </div>
        </div>
    </div>

    <div class="flex flex-col mt-4">
        <div class="overflow-x-auto">
            <div class="shadow overflow-hidden sm:rounded-lg">
                <!-- tab menu -->
                <div class="mt-4">
                    <TabMenu :model="tabMenuItems" />
                </div>
                <!-- table header -->
                <div class="bg-gray-50 hidden lg:block" v-if="!isLoading">
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
                <div class="bg-white divide-y divide-gray-200" v-if="!isLoading">
                    <template v-for="(workOrder, index) in workOrders" :key="index">

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
                                <span>{{ workOrder.workCenter }}</span>
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden">Assigned To:</span>
                                <span>{{ workOrder.assignedTo }}</span>
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
import { ref } from 'vue';

export default {
    name: 'WorkOrders',
    setup() {
        const isLoading = ref(false);

        const currentTab = ref('New');

        const tabMenuItems = ref([
            { label: 'Novi', icon: 'pi pi-fw pi-plus', command: () => { currentTab.value = 'New'; } },
            { label: 'Aktivni', icon: 'pi pi-fw pi-cog', command: () => { currentTab.value = 'Active'; } },
            { label: 'Završeni', icon: 'pi pi-fw pi-check', command: () => { currentTab.value = 'Finished'; } }
        ]);

        const workOrders = ref([
            {
                id: '1',
                title: 'Work order 1',
                status: 'Open',
                workCenter: 'WC 1',
                assignedTo: 'Ivo Ivić'
            },
            {
                id: '2',
                title: 'Work order 2',
                status: 'Closed',
                workCenter: 'WC 2',
                assignedTo: 'Mara Marić'
            },
            {
                id: '3',
                title: 'Work order 3',
                status: 'Open',
                workCenter: 'WC 3',
                assignedTo: 'Ivo Ivić'
            },
            {
                id: '4',
                title: 'Work order 4',
                status: 'Closed',
                workCenter: 'WC 4',
                assignedTo: 'Mara Marić'
            },
            {
                id: '5',
                title: 'Work order 5',
                status: 'Open',
                workCenter: 'WC 5',
                assignedTo: 'Ivo Ivić'
            },
        ]);

        return {
            isLoading,
            workOrders,
            currentTab,
            tabMenuItems
        };
    },
    components: {
        VCircularLoader,
        Button,
        TabMenu
    }
};
</script>