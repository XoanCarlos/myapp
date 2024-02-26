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
<div class="row justify-content-center mt-4">
    <div class="col-md-8 bg-light"> 
        <div class="row justify-content-center text-primary p-2">
            <h5 class="text-center font-weight-bold">Listado Clientes</h5>
        </div>
    <div class='table-responsive'>  
            <table class="table">
                <thead class="table-info">
                    <tr class="text-center">
                        <th>Codigo</th>
                        <th class="text-center">Producto</th>
                        <th>Precio</th>
                        <th>Imagen</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="producto in productos" :key="producto.id">
                        <td class="text-center">{{ producto.codigo }}</td>
                        <td>{{ producto.producto }}</td>
                        <td class="text-center">{{ producto.precio }} €</td>
                        <td>zonadefoto</td>
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
import Swal from 'sweetalert2'  ;

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
   mounted() {
        this.cargarProductos();
    },
    // métodos gestionar productos	
    methods:{

        async cargarProductos(){
            try{
                const response = await fetch('http://localhost:3000/productos');
                this.productos = await response.json();
            } catch (error) {
                console.error(error);
            } 
        },

        limpiarArticulo() {
            this.codigo = '';
            this.producto = '';
            this.precio = '';
            this.$refs.fileInput.value = null;

        },

        handleFileChange(event) {
            this.imagen = event.target.files[0];
            console.log(this.imagen);
        },

        async guardarArticulo() {
           const producto = {
                codigo: this.codigo,
                producto: this.producto.trim(),
                precio: this.precio.trim(),
                
            };
            let url = 'http://localhost:3000/productos';
            let metodo = 'POST';

            try {
                const response = await fetch(url, {
                    method: metodo,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(producto),
                });
                // aquí la subida de la imagen

                const formData = new FormData()
                formData.append('imagen', producto.imagen);

                Swal.fire({
                        title: 'Producto guardado',
                        text: 'El producto ha sido guardado correctamente',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                    //this.limpiarArticulo();
                if (!response.ok){
                    Swal.fire({
                        title: 'Error al guardar',
                        text: 'Ha ocurrido un error al guardar el producto',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                }
            } catch (error) {
                console.error(error);
                    }
                },
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
