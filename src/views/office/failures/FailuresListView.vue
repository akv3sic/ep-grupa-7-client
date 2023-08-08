<template>
    <!-- page header  -->
    <div class="flex flex-col">
        <div class="flex flex-row">
            <div class="flex-1 flex-col">
                <h2 class="font-medium text-xl ">Kvarovi</h2>
                <!-- page description  -->
                <p class="text-blue-500">Pregled prijavljenih kvarova</p>
            </div>
            <div class="flex-1 flex-col">
                <Button label="Prijavi kvar" icon="pi pi-plus" size="small"></Button>
            </div>
        </div>
    </div>

    <div class="flex flex-col mt-4">
        <div class="overflow-x-auto">
            <div class="shadow overflow-hidden sm:rounded-lg">
                <!-- table header -->
                <div class="bg-gray-50 hidden lg:block" v-if="!isLoading">
                    <div class="grid grid-cols-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div class="px-6 py-3">#</div>
                        <div class="px-6 py-3">Naziv</div>
                        <div class="px-6 py-3">Opis</div>
                        <div class="px-6 py-3">Prijavio/la</div>
                        <div class="px-6 py-3">Radni centar</div>
                        <div class="px-6 py-3">Status</div>
                    </div>
                </div>
                <!-- table body -->
                <div class="bg-white divide-y divide-gray-200" v-if="!isLoading">
                    <template v-for="(failure, index) in failures" :key="index">

                        <div class="grid grid-cols-2 lg:grid-cols-6">
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden">#:</span>
                                <span>{{ failure.id }}</span>
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden">Naziv:</span>
                                <span>{{ failure.name }}</span>
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden">Opis:</span>
                                <span>{{ failure.description }}</span>
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden">Prijavio/la:</span>
                                <span>{{ failure.reportedBy }}</span>
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden">Radni centar:</span>
                                <span>{{ failure.workCenter }}</span>
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden">Status:</span>
                                <span>{{ failure.status }}</span>
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
import { ref } from 'vue';

export default {
    name: 'FailuresList',
    setup() {
        const isLoading = ref(false);

        const failures = ref([
            {
                id: '1',
                name: 'Failure 1',
                description: 'Description of failure 1',
                reportedBy: 'Ivo Ivić',
                workCenter: 'WC 1',
                status: 'Open'
            },
            {
                id: '2',
                name: 'Failure 2',
                description: 'Description of failure 2',
                reportedBy: 'Mara Marić',
                workCenter: 'WC 2',
                status: 'Closed'
            },
            {
                id: '3',
                name: 'Failure 3',
                description: 'Description of failure 3',
                reportedBy: 'Ivo Ivić',
                workCenter: 'WC 3',
                status: 'Open'
            },
        ]);

        return {
            isLoading,
            failures,
        };
    },
    components: {
        VCircularLoader,
        Button
    }
};
</script>
