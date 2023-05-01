<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <div class="flex flex-col items-center justify-center">
            <h1 class="text-9xl font-bold text-gray-700">404</h1>
            <h1 class="text-2xl font-bold text-gray-700 text-center">Stranica koju tražite ne postoji.</h1>
            <img src="../assets//img/not-found.png" alt="404" class="md:w-2/3 w-3/5 my-5" />
            <p class="text-gray-700 mt-2 mb-4 text-center">Pokušajte ponovo ili se vratite na
                <router-link to="/" class="text-blue-500 hover:text-blue-600"> početnu stranicu</router-link>.
            </p>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "NotFoundView"
}
</script>

<style lang="css"></style>