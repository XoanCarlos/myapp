import PaginaInicio  from '@/components/PaginaInicio.vue'
import TablaClientes from '@/components/TablaClientes.vue'
import { createRouter, createWebHistory } from 'vue-router'


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
    component: () => import('@/components/TablaArticulos.vue')
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
