<template>
    <div>
    <!-- barra de navegación-->
    <NavBar/>
    </div>
    <div>
        <h1 class="text-center">Formulario Contacto</h1>
        <p>.</p>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
    name: 'TablaContacto',
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
