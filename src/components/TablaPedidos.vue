<template>
    <div>
    <!-- barra de navegación-->
    <NavBar/>
    </div>
    <div>
        <h1 class="text-center">Mi Cesta</h1>
        <p>.</p>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
    name: 'TablaPedidos',
    components: {
        NavBar,
    },
}
</script>

<style scoped>
h1 {
    color: blue;
}
p {
    font-size: 18px;
}
</style>
