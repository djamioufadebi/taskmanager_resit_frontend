import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import TaskList from '../views/TaskList.vue';
import Register from '../views/Register.vue';


const routes = [

  { path: '/login', 
   component: Login, 
    name : "login"
  },

  { path: '/dashboard', 
    component: Dashboard,
    name : "dashboard" 
  },

  { path: '/tasks', 
    component: TaskList,
    name : "tasks" 
  },



  { path: '/register', 
    component: Register,
    name : "register"  
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;