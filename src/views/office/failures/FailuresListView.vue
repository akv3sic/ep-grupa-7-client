<template>
    <!-- page header  -->
    <div class="flex flex-col">
        <div class="flex flex-row">
            <div class="flex-1 flex-col">
                <h2 class="font-medium text-xl ">Kvarovi</h2>
                <!-- page description  -->
                <p class="text-blue-500">Pregled prijavljenih kvarova</p>
            </div>
            <!-- show all or only unresolved failures -->
            <div class="flex-1 flex-col">
                <div class="flex flex-row">
                    <span class="text-gray-500 mt-1">Prikaži samo nepovezane kvarove</span>
                    <InputSwitch v-model="showOnlyUnresolved" class="ml-2" />
                </div>
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
                        <div class="px-6 py-3"></div>
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
                                <span v-tooltip="failure.description">{{ truncateDescription(failure.description) }}</span>
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden">Prijavio/la:</span>
                                <span>{{ failure.reported_by.first_name + " " + failure.reported_by.last_name }}</span>
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden">Radni centar:</span>
                                <span>{{ failure.work_center.name }}</span>
                            </div>
                            <div class="px-6 py-4 lg:whitespace-nowrap lg:text-sm lg:text-gray-900 flex flex-col">
                                <span class="text-xs text-gray-400 lg:hidden"></span>
                                <span v-if="failure.work_order" v-tooltip="'Vidi povezani radni nalog'">
                                    <i class="pi pi-eye"
                                        @click="$router.push('/office/radni-nalog/' + failure.work_order)"></i>
                                </span>
                                <span v-else v-tooltip="'Poveži s radnim nalogom'">
                                    <i class="pi pi-link"></i>
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
import VCircularLoader from '@/components/base/VCircularLoader.vue';
import Button from 'primevue/button';
import { useFailuresStore } from '@/stores/failures.store';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watchEffect } from 'vue';
import { truncateDescription } from '@/utils/stringUtils';
import InputSwitch from 'primevue/inputswitch';

export default {
    name: 'FailuresList',
    setup() {
        const { failures, isLoading } = storeToRefs(useFailuresStore());

        const showOnlyUnresolved = ref(false);

        const showOnlyUnresolvedFailures = () => {
            return failures.value.filter((failure) => !failure.work_order);
        };

        watchEffect(() => {
            if (showOnlyUnresolved.value) {
                failures.value = showOnlyUnresolvedFailures();
            }
            else
                useFailuresStore().fetchFailures();
        });


        onMounted(() => {
            useFailuresStore().fetchFailures();
        });

        return {
            isLoading,
            failures,
            truncateDescription,
            showOnlyUnresolved,
            showOnlyUnresolvedFailures,
        };
    },
    components: {
        VCircularLoader,
        Button,
        InputSwitch
    }
};
</script>
