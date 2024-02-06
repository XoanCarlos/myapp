<template>
    <div>
    <!-- barra de navegación-->
    <NavBar/>
    </div>
<br/>
    <div class="row justify-content-center mt-4">
            <h3 class="text-center font-weight-bold">Gestión Tareas</h3>
    </div>
<hr/> <!-- formulario -->
<div class="container-fluid">
    <div class="row" id="map_section">
        <div class="col-12 col-m-6 col-lg-8 mx-auto">
        <form class="form-inline">    
            <div class="input-group mb-3">
                <span class="input-group-text custom-span">Nombre:</span>
                <input v-model="nombre" type="text" class="form-control form-control-sm" id="nombre" name="nombre">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text custom-span">Descripción:</span>
                <input ref ='descripcion' v-model="descripcion" type="text" class="form-control" id="descripcion" name="descripcion">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text custom-span">Fecha:</span>
                <input v-model="fecha" type="text" class="form-control" id="fecha" name="fecha">
            </div>

            <div class="input-group mb-3">
                <span class="input-group-text custom-span">Prioridad:</span>
                <input v-model="prioridad" type="text" class="form-control" id="prioridad" name="prioridad">
            </div>
            <!-- Botones -->
            <div class="text-center">
                <button type="button" class="btn btn-primary m-2" @click="guardarTarea">Guardar</button>
                <button type="button" class="btn btn-secondary" @click="limpiarTarea">Limpiar</button>
            </div>
            </form>
        </div>
    </div>
</div>
 <!-- tabla de datos el resto sería igual que antesa -->       
<hr/>
 <div class="row justify-content-center mt-4">
    <div class="col-md-8 bg-light"> 
        <div class="row justify-content-center text-primary p-2">
            <h5 class="text-center font-weight-bold">Listado Tareas</h5>
        </div>
    <div class='table-responsive'>    
        <table class = 'table table-striped table-bordered'>
            <thead class="table-info">
                <tr class="text-center">
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Fecha Alta</th>
                    <th>Prioridad</th>
                    <th>Gestión</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for = 'tarea in tareas' :key='tarea._id'>
                    <td class='text-center'>{{tarea._id}}</td>
                    <td>{{tarea.nombre}}</td>
                    <td>{{tarea.descripcion}}</td>
                    <td class="text-center">{{tarea.fecha}}</td>
                    <td class="text-center">{{tarea.prioridad}}</td>
                    <td class="text-center ">
                        <div>
                            <button class="btn btn-warning m-2" @click="modificarTarea(tarea.id)">
                                <i class="fas fa-pencil-alt"></i> <!-- este es Awesome-->
                                 <!-- <i class="bi bi-trash"></i> Ícono de lápiz con Boostrap pero no funciona por lo menos a mí -->
                            </button>
                            <button class="btn btn-danger m-2" @click="eliminarTarea(tarea.id)">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>  
            </tbody>
        </table>        
        </div>
    </div>
</div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
//import Swal from 'sweetalert2';
export default {
  name: 'TablaTareas',
  components: {
    NavBar,
  },
    data() {
        return {
        nombre: '',
        descripcion: '',
        fecha: '',
        prioridad: '',
        tareas: [],
        };
    },

    created() {
        this.obtenerTareas();
    },

    methods:{
       async obtenerTareas(){
          try {
            const res = await fetch('http://localhost:5000/tareas');
            if (!res.ok) {
                const message = `An error has occured: ${res.status}`;
                throw new Error(message);
            }
            this.tareas = await res.json();
            console.log(this.tareas);
        } catch (error) {
            console.error(error);
        }
      },
    }, 
};



</script>
<style></style>
```
