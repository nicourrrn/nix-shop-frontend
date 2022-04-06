import { createRouter, createWebHistory } from 'vue-router'

// Products
import Menu from '../views/Products/Menu'
import Product from '../views/Products/Product'
// Supplier
import Supplier from '../views/Supplier/Supplier'
import SupplierList from '../views/Supplier/SupplierList'
// User
import Auth from '../views/User/Auth'
import Basket from '../views/User/Basket'
import OldBaskets from '../views/User/OldBaskets'
import User from '../views/User/User'

const routes = [
  {
    path: '/products',
    name: 'menu',
    component: Menu
  },
  {
    path: '/products/:id',
    name: 'product',
    component: Product
  },
  {
    path: '/suppliers',
    name: 'suppliers',
    component: SupplierList
  },
  {
    path: '/suppliers/:id',
    name: 'supplier',
    component: Supplier
  },
  {
    path: '/user',
    name: 'user',
    component: User
  },
  {
    path: '/user/auth',
    name: 'auth',
    component: Auth
  },
  {
    path: '/user/basket',
    name: 'basket',
    component: Basket
  },
  {
    path: '/user/basket/old',
    name: 'old_basket',
    component: OldBaskets
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
