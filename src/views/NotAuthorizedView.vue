<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <div class="flex flex-col items-center justify-center">
            <h1 class="text-9xl font-bold text-gray-700">403</h1>
            <h1 class="text-2xl font-bold text-gray-700 text-center">Nemate dozvolu za pristup ovoj stranici.</h1>
            <img src="../assets/img/unauthorized.png" alt="403 - pristup zabranjen" class="md:w-1/5 w-3/5 my-5" />
            <p class="text-gray-700 mt-2 mb-4 text-center">
                Provjerite svoje ovlasti ili se vratite na
                <router-link to="/" class="text-blue-500 hover:text-blue-600"> početnu stranicu</router-link>.
            </p>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "NotAuthorizedView"
}
</script>

<style lang="css"></style>
