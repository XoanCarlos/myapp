div<template>
    <div>
      <NavBar />
      <div class="page-content">
        <br>r
        <h1 class="text-center">Panel Gestión {{ alumno }}</h1>
        <div class="button-container">
          <table>
            <tr>
              <td>
                <router-link to="/clientes" class="custom-button">
                  <div class="icon-text-container">
                    <i class="fas fa-user fa-lg"></i>
                      <span>Clientes</span>
                  </div>
                </router-link>
              </td>
              <td>
                <router-link to="/articulos" class="custom-button">
                  <div class="icon-text-container">
                    <i class="fas fa-box fa-lg"></i>
                    <span>Artículos</span>
                  </div>
                </router-link></td>
             </tr>
             <tr>  
               <td><router-link to="/tareas" class="custom-button">
                <div class="icon-text-container">
                  <i class="fas fa-tasks fa-lg"></i>
                  <span>Tareas</span>
                </div>
              </router-link></td>
               <td><router-link to="/contacto" class="custom-button">
                  <div class="icon-text-container">
                    <i class="fas fa-envelope fa-lg"></i>
                    <span>Contacto</span>
                  </div>
                </router-link></td>
             </tr> 
             <tr>
               <td><router-link to="/Pedidos" class="custom-button">
                <div class ="icon-text-container">
                  <i class="fas fa-shopping-cart fa-lg"></i>
                  <span>Pedidos</span>
                </div>
                </router-link></td>
              </tr>  
        </table>
        </div>
      </div>
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
        alumno: 'Distribuciones Teis'
      }
    }
  }
  </script>
  
  <style scoped>
  .page-content {
    padding: 20px;
  }
  
  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 100px); /* Ajuste para centrar verticalmente en la página */
  }
  
  .custom-button {
    width: 200px;
    height: 200px;
    margin: 10px;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: #3498db;
    color: white;
    text-decoration: none; /* Evitar subrayado */
    outline: none; /* Evitar el borde al hacer clic */
    border: none;
    border-radius: 10px;
    transition: background-color 0.3s ease;
  }
  
  .custom-button:hover {
    background-color: #2980b9;
  }
  .icon-text-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
  </style>
  