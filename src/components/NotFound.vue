<template>
    <div>
    <!-- barra de navegación-->
    <NavBar/>
    </div>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-8" style="font-family: 'Comic Sans MS', cursive;">
          <h4 class="text-center">Perdona, algo hemos hecho mal pero no existe la página que buscas</h4>
          <br>
          <hr>
          <br>
          <div class="text-center">
            <img src="../assets/404.png" alt="404" class="img-fluid" width="300" height="200">
          </div>
          <br>
          <br>
          <div class="text-center">
            <router-link class="btn btn-light-blue enlace-con-fondo" :to="{ name: 'home' }" >Ir a Página Inicio</router-link>
          </div>
            </div>
       </div>
    </div>


      
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
    name: 'NotFound',
    components: {
        NavBar,
    }
}
</script>

<style scoped>
  .enlace-con-fondo {
    background-color: #c1dbf6;
    /* Otros estilos según sea necesario */
  }
</style>
