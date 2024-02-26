<template>
    <div>
    <!-- barra de navegación-->
    <NavBar/>
    </div>
<br/>
    <div class="row justify-content-center">
            <h3 class="text-center font-weight-bold">Gestión Artículos</h3>
    </div>
<!-- formulario -->
<div class="container-fluid border p-4">
    <div class="row justify-content-center align-items-center" id="map_section">
        <div class="col-10 col-m-6 col-lg-8 mx-auto">
            <form class="form-inline">    
                <div class="input-group mb-3 w-25">
                    <span class="input-group-text custom-span">Código:</span>
                    <input v-model="codigo" type="text" class="form-control form-control-sm" placeholder="Codigo Producto" id="codigo" name="codigo">                
                 </div>
                 <div class="input-group mb-3">
                 <div class="input-group-prepend">
                    <span class="input-group-text custom-span">Artículo:</span>
                </div>
                    <input ref="producto" v-model="producto" type="text" class="form-control w-50" placeholder="Nombre Producto" id="producto" name="producto">
                    <div style="width: 1em;"></div>
                <div class="input-group-append">
                    <span class="input-group-text custom-span">Precio:</span>
                </div>
                    <input v-model="precio" type="text" placeholder="Precio €" class="form-control w-25" id="precio" name="precio">                    </div>
                    <!-- Input para el archivo -->                    <div class="custom-file">
                <div class="input-group mb-3 w-50">
                    <input type="file" placeholder="Selecciona un archivo" class="custom-file-input form-control" id="imagen" name="imagen" 
                        accept=".png, .jpg, .jpeg" @change="handleFileChange" ref="fileInput">                    </div>
                </div>
                    <!-- Botones -->
                <div class="text-center">
                    <button type="button" class="btn btn-primary m-2" @click="guardarArticulo">Grabar</button>
                    <button type="button" class="btn btn-secondary" @click="limpiarArticulo">Limpiar</button>
                </div>
                </form>
            </div>
        </div>
    </div>

<!-- tabla dinámica-->
<div class="container-fluid border mx-auto">
    <div class="row justify-content-center align-items-center">
        <div class="col-12 col-m-6 col-lg-8 mx-auto">
            <table class="table">
                <thead>
                    <tr>
                       <td class="text-center font-weight-bold">Listado Productos</td>                        
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="producto in productos" :key="producto.id">
                        <td><img :src="producto.descripcion" alt="Descripción del producto" style="max-width: 100px; max-height: 100px;"></td>
                        <td>{{ producto.id }} - {{ producto.nombre }} </td>
                        <td>{{ producto.precio }}</td>
                        <td class="text-center ">
                            <div>
                                <button class="btn btn-warning m-2" @click="modificarProducto(producto.id)">
                                    <i class="fas fa-pencil-alt"></i> <!-- este es Awesome-->
                                    <!-- <i class="bi bi-trash"></i> Ícono de lápiz con Boostrap pero no funciona por lo menos a mí -->
                                </button>
                                <button class="btn btn-danger m-2" @click="eliminarProducto(producto.id)">
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
import { Swal } from 'sweetalert2/dist/sweetalert2';

export default {
    name: 'TablaArticulos',
    components: {
        NavBar,
    },
    data() {
        return {
            productos: [],
            codigo: '',
            producto: '',
            precio: '',
            imagen: '',
        };
    },
   /* mounted() {
        this.cargarProductos();
    },*/
    // métodos gestionar productos	
    methods:{
        cargarProductos(){
            fetch('http://localhost:3000/productos')
            .then(response => response.json())
            .then(data => {
                this.productos = data;
            })
            .catch(error => console.error(error));
        },

        limpiarArticulo() {
            this.codigo = '';
            this.producto = '';
            this.precio = '';
            this.$ref.fileInput.value = null;
            Swal.fire({
                title: 'Datos limpiados',
                text: 'Campos del formulario eliminados',
                icon: 'info',
                confirmButtonText: 'OK',
            });
        },

        handleFileChange(event) {
            this.imagen = event.target.files[0];
            console.log(this.imagen);
        },

        async guardarArticulo() {
            const formData = new FormData();
            formData.append('codigo', this.codigo);
            formData.append('producto', this.producto);
            formData.append('precio', this.precio);
            formData.append('imagen', this.imagen);

            try {
                const response = await fetch('http://localhost:3000/productos', {
                    method: 'POST',
                    body: formData,
                });
                console.log(response);
                const data = await response.json();
                console.log(data);
                //this.cargarProductos();
            } catch (error) {
                console.error(error);
            }
        },
    }
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
