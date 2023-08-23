<template>
    <input ref="rfidInputRef" v-model="rfid" @keyup.enter="sendRfid" class="rfid-input" aria-label="RFID Input" />
</template>
  
<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from "@/stores/auth";
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

export default defineComponent({
    name: 'RFIDLogin',
    setup() {
        const rfid = ref('');
        const rfidInputRef = ref<HTMLInputElement | null>(null);
        const { loginWithRFID, error: loginError } = useAuthStore();

        const router = useRouter();

        const toast = useToast();

        // Utility to validate the RFID format
        const isValidRfid = (value: string): boolean => {
            const rfidPattern = /^\d{10}$/; // Matches exactly 10 digits
            return rfidPattern.test(value);
        };

        // Function to handle the login logic
        const handleLogin = async (rfidValue: string) => {
            try {
                const isSuccessful = await loginWithRFID(rfidValue);

                if (isSuccessful) {
                    toast.add({ severity: 'success', summary: 'Prijava uspješna', detail: 'Dobrodošli u WorkOrders+', life: 3000 });
                    const user = JSON.parse(localStorage.getItem('user') || '{}');
                    if (user?.is_superuser) {
                        router.push('/office');
                    } else {
                        router.push('/work-center-terminal');
                    }
                    return true;
                }
                else {
                    toast.add({ severity: 'error', summary: 'Prijava neuspješna', detail: 'Pokušajte ponovno.', life: 3000 });
                    return false;
                }
            } catch (error) {
                toast.add({ severity: 'error', summary: 'Greška', detail: 'Pokušajte ponovno.', life: 3000 });
                return false;
            }
        };

        // Function to handle the RFID-specific logic
        const sendRfid = async () => {
            if (rfid.value && isValidRfid(rfid.value)) {
                const loginStatus = await handleLogin(rfid.value);

                // Clear the input regardless of the login status
                rfid.value = '';
            }
            else {
                // invalid RFID pattern
                toast.add({ severity: 'warn', summary: 'Neispravna RFID vrijednost', detail: 'Unesite ispravnu RFID vrijednost.', life: 3000 });
                rfid.value = '';
            }
        };

        const maintainFocus = () => {
            rfidInputRef.value?.focus();
        };

        onMounted(() => {
            rfidInputRef.value?.addEventListener('blur', maintainFocus);
            maintainFocus();
        });

        onUnmounted(() => {
            rfidInputRef.value?.removeEventListener('blur', maintainFocus);
        });

        return {
            rfid,
            rfidInputRef,
            sendRfid
        };
    }
});
</script>
  
<style scoped>
.rfid-input {
    position: absolute;
    top: -100px;
    left: -100px;
    width: 1px;
    height: 1px;
    opacity: 0;
    z-index: -1;
}
</style>
  