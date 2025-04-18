import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import TaskList from '../views/TaskList.vue';
import Register from '../views/Register.vue';
import CreateTask from '../views/CreateTask.vue';
import EditTask from '../views/EditTask.vue';
import TaskDetails from '../views/TaskDetails.vue';
import Home from '../views/Home.vue';


const routes = [

  { path: '/login', 
   component: Login, 
    name : "login"
  },

  { path: '/dashboard', 
    component: Home,
    name : "dashboard" 
  },

  { path: '/tasks', 
    component: TaskList,
    name : "tasks" 
  },

  {
    path: '/tasks/create',
    name: 'tasks.create',
    component: CreateTask,
    meta: { requiresAuth: true },
  },

  {
    path: '/tasks/edit/:id',
    name: 'tasks.edit',
    component: EditTask,
    meta: { requiresAuth: true },
    props: true,
  },

  {
    path: '/tasks/:id',
    name: 'tasks.show',
    component: TaskDetails,
    meta: { requiresAuth: true },
    props: true,
  },

  { path: '/register', 
    component: Register,
    name : "register"  
  },

  // Redirection par défaut
  {
    path: '/:catchAll(.*)',
    redirect: '/login',
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard : protège les routes
/* router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'login' });
  } else if ((to.name === 'login' || to.name === 'register') && isAuthenticated()) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
}); */

export default router;