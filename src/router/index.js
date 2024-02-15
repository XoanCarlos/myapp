import PaginaInicio  from '@/components/PaginaInicio.vue'
import TablaClientes from '@/components/TablaClientes.vue'
import TablaArticulos from '@/components/TablaArticulos.vue'
import TablaTareas from '@/components/TablaTareas.vue'
import { createRouter, createWebHistory } from 'vue-router'
import TablaContacto from '@/components/TablaContacto.vue'
import Pedidos from '@/components/TablaPedidos.vue'


const routes = [
  {
    path: '/', 
    name: 'home',
    component: PaginaInicio
  },
  {
    path: '/clientes',
    name: 'clientes',
    component: TablaClientes
  },
  {
    path: '/articulos',
    name: 'articulos',
    component: TablaArticulos
  },
  {
    path: '/tareas',
    name: 'tareas',
    component: TablaTareas
  },
  {
    path: '/pedidos',
    name: 'pedidos',
    component: Pedidos
  },

  {
    path: '/contacto',
    name: 'contacto',
    component: TablaContacto
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/components/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router


