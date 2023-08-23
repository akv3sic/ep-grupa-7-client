<template>
    <div class="footer">
        <p>
            &copy; 2023.
            <a href="https://github.com/akv3sic/" target="_blank">Ante Kvesić</a> &middot;
            <a href="https://github.com/VjekoRezic" target="_blank">Vjekoslav Rezić</a>.
            Elektroničko poslovanje, <a href="http://fsre.sum.ba" target="_blank">FSRE</a>.
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TheThinFooter',
});
</script>

<style scoped>
.footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.02);
}

.footer a {
    color: #1e88e5;
}
</style>
