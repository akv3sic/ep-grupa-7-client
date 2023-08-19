<template>
    <div class="p-6 space-y-3">
        <h2 class="text-xl font-medium">Prijavi kvar</h2>
        <p class="text-blue-500">Prijavi kvar na radnom mjestu</p>

        <form @submit.prevent="reportFailure">
            <div class="space-y-4">
                <!-- Naslov kvara -->
                <div>
                    <label for="title" class="block text-sm font-medium text-gray-700">Naslov</label>
                    <div class="mt-1">
                        <InputText id="title" v-model="failure.title" class="w-full" />
                    </div>
                </div>

                <!-- Opis kvara -->
                <div>
                    <label for="description" class="block text-sm font-medium text-gray-700">Opis</label>
                    <div class="mt-1">
                        <InputTextarea id="description" v-model="failure.description" class="w-full" rows="4">
                        </InputTextarea>
                    </div>
                </div>
            </div>

            <div class="mt-6">
                <Button type="submit" label="Prijavi kvar" class="p-button-primary" />
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';

interface FailureReport {
    title: string;
    description: string;
}

export default defineComponent({
    name: 'ReportFailureView',
    components: {
        InputText,
        InputTextarea: Textarea,
        Button
    },
    setup() {
        const failure = ref<FailureReport>({
            title: '',
            description: ''
        });

        function reportFailure() {
            console.log('Prijavljeni kvar:', failure.value);
            // TODO: Implementirati logiku za prijavu kvara
        }

        return {
            failure,
            reportFailure
        };
    }
});
</script>

<style scoped></style>
