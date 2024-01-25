<template>
    <div>
        <NavBar />
    </div>
    <div>
        <h1 class="text-center">Página proyecto del {{ alumno }}</h1>
    </div>

</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
    name: 'PaginaInicio',
    components: {
        NavBar
    },
    data() {
        return {
            alumno: 'nombre del alumno/a'
        }
    },
    mounted() {
        console.log('Componente PaginaInicio.vue cargado');
    }
}
</script>