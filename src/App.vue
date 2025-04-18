<template>
  <div>

    <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow fw-bold text-uppercase">
        <div class="container-fluid">
          <!-- Bouton de menu sur petits écrans -->
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
              <!-- Lien vers le tableau de bord si l'utilisateur est connecté -->
              <li class="nav-item" v-if="isAuthenticated">
                <router-link class="nav-link" :to="{ name: 'dashboard' }" active-class="active">
                  <i class="bi bi-speedometer2"></i> Tableau de Bord
                </router-link>
              </li>

              <!-- Lien vers les tâches si l'utilisateur est connecté -->
              <li class="nav-item" v-if="isAuthenticated">
                <router-link class="nav-link" :to="{ name: 'tasks' }" active-class="active">
                  <i class="bi bi-card-checklist"></i> Tâches
                </router-link>
              </li>
            </ul>

            <div class="d-flex">
              <!-- Affichage de la déconnexion si l'utilisateur est connecté -->
              <button class="btn btn-outline-light" v-if="isAuthenticated" @click="logout">
                <i class="bi bi-box-arrow-right"></i> Déconnexion
              </button>

              <!-- Affichage de l'inscription et connexion si l'utilisateur n'est pas connecté -->
              <router-link class="btn btn-outline-light ms-2" v-if="!isAuthenticated" :to="{ name: 'register' }">
                <i class="bi bi-pencil-square"></i> S'inscrire
              </router-link>
              <!-- <router-link class="btn btn-outline-light ms-2" v-if="!isAuthenticated" :to="{ name: 'login' }">
                <i class="bi bi-box-arrow-in-right"></i> Connexion
              </router-link> -->

            </div>



          </div>
        </div>
      </nav>
    </header>

    <!-- Contenu principal -->
    <div class="container mt-3">
      <router-view />
    </div>

  </div>
</template>


<script>
import { useAuthStore } from "./stores/auth";
import { computed } from "vue";

export default {
  setup() {
    const authStore = useAuthStore();

    // Vérifie si l'utilisateur est connecté
    const isAuthenticated = computed(() => authStore.isAuthenticated());

    const logout = () => {
      authStore.logout();
    };

    return { isAuthenticated, logout };
  },
};
</script>

<style scoped>

header {
  line-height : 1.5;
  max-height : 100vh;
}

.navbar {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

 .btn-outline-light:hover {
  background-color: #fff;
  color: #333;
} 

.navbar-nav .nav-item .active {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: white !important;
}

.navbar-toggler-icon {
  filter: invert(1);
}

 .nav-link {
  display: flex;
  align-items: center;
  gap: 5px;
} 
</style>
