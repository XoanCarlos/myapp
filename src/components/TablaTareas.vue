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
                <button type="button" class="btn btn-secondary m-2" @click="modificarTarea">Modificar</button>
                <button type="button" class="btn btn-light m-2" @click="limpiarCampos">Limpiar</button>
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
                            <button class="btn btn-warning m-2" @click="cargaTarea(tarea)">
                                <i class="fas fa-pencil-alt"></i> <!-- este es Awesome-->
                                 <!-- <i class="bi bi-trash"></i> Ícono de lápiz con Boostrap pero no funciona por lo menos a mí -->
                            </button>
                            <button class="btn btn-danger m-2" @click="eliminarTarea(tarea._id)">
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
import Swal from 'sweetalert2';
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
        limpiarCampos() {
            // Limpiar los campos del formulario
            this.nombre = '';
            this.descripcion = '';
            this.fecha = '';
            this.prioridad = '';

            // Mostrar mensaje de éxito con SweetAlert
            Swal.fire({
                icon: 'info',
                title: 'Campos limpiados',
                text: 'Los campos del formulario se han limpiado correctamente.',
            });
        },

        limpiarTarea() {
            this.nombre = '';
            this.descripcion = '';
            this.fecha = '';
            this.prioridad = '';
      },
      
       async obtenerTareas(){
          try {
            const res = await fetch('http://localhost:5000/tareas');
            if (!res.ok) {
                const message = `An error has occured: ${res.status}`;
                throw new Error(message);
            }
            this.tareas = await res.json();
        } catch (error) {
            console.error(error);
        }
      },

      async guardarTarea() {
            try {
                const nuevaTarea = {
                    nombre: this.nombre,
                    descripcion: this.descripcion,
                    fecha: this.fecha,
                    prioridad: this.prioridad
                };

                const res = await fetch('http://localhost:5000/tareas', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(nuevaTarea)
                });

                await Swal.fire({
                        icon: 'success',
                        title: '¡Tarea guardada!',
                        text: 'La nueva tarea se ha guardado correctamente.'
                    });

                if (!res.ok) {
                    const message = `An error has occured: ${res.status}`;
                    throw new Error(message);
                }

                // Actualizar la lista de tareas después de guardar la nueva tarea
                await this.obtenerTareas();
                
                // Limpiar los campos del formulario después de guardar la tarea
                this.limpiarTarea();

            } catch (error) {
                console.error(error);
                await Swal.fire({
                    icon: 'error',
                    title: 'Error al guardar la tarea',
                    text: 'Ha ocurrido un error al intentar guardar la tarea. Por favor, inténtalo de nuevo.'
                });
            }
        },

        async eliminarTarea(id) {
            try {
                const res = await fetch(`http://localhost:5000/tareas/${id}`, {
                    method: 'DELETE'
                });

                if (!res.ok) {
                    const message = `An error has occured: ${res.status}`;
                    throw new Error(message);
                }

                await Swal.fire({
                    icon: 'success',
                    title: '¡Tarea eliminada!',
                    text: 'La tarea se ha eliminado correctamente.'
                });

                // Actualizar la lista de tareas después de eliminar la tarea
                await this.obtenerTareas();

            } catch (error) {
                console.error(error);
                await Swal.fire({
                    icon: 'error',
                    title: 'Error al eliminar la tarea',
                    text: 'Ha ocurrido un error al intentar eliminar la tarea. Por favor, inténtalo de nuevo.'
                });
            }
        },

        cargaTarea(tarea) {
            this.nombre = tarea.nombre;
            this.descripcion = tarea.descripcion;
            this.fecha = tarea.fecha;
            this.prioridad = tarea.prioridad;
            this.tareaSeleccionada = tarea;
        },



        async modificarTarea() {
            try {
                // Obtener la tarea seleccionada
                const tarea = this.tareaSeleccionada;

                // Actualizar los campos de la tarea seleccionada con los nuevos valores del formulario
                tarea.nombre = this.nombre;
                tarea.descripcion = this.descripcion;
                tarea.fecha = this.fecha;
                tarea.prioridad = this.prioridad;

                // Enviar la solicitud PUT con la tarea actualizada al servidor
                const res = await fetch(`http://localhost:5000/tareas/${tarea._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tarea)
                });

                if (!res.ok) {
                throw new Error(`An error has occurred: ${res.status}`);
                }

                // Actualizar la lista de tareas después de modificar la tarea
                await this.obtenerTareas();

                // Limpiar los campos del formulario después de modificar la tarea
                this.limpiarCampos();

                // Mostrar mensaje de éxito
                await Swal.fire({
                icon: 'success',
                title: 'Tarea modificada',
                text: 'La tarea se ha modificado correctamente.'
                });

                // Limpiar la tarea seleccionada después de la modificación
                this.tareaSeleccionada = null;
            } catch (error) {
                console.error(error);
                // Mostrar mensaje de error
                await Swal.fire({
                icon: 'error',
                title: 'Error al modificar la tarea',
                text: 'Ha ocurrido un error al intentar modificar la tarea. Por favor, inténtalo de nuevo.'
                });
               }
            },


    }, 
};

</script>
<style></style>
```
