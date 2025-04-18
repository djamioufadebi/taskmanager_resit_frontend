<template>
    <div class="container mt-4">

        <!-- Titre du Tableau de Bord -->
        <h2 class="text-center mb-4">Tableau de Bord</h2>

        <!-- Gestion du chargement -->
        <div v-if="loading" class="text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Chargement...</span>
            </div>
        </div>

        <!-- Affichage des erreurs -->
        <div v-if="error" class="alert alert-danger text-center">
            {{ error }}
        </div>

        <!-- Statistiques des tâches -->
        <div v-else class="row">

            <!-- Carte Tâches Terminées -->
            <div class="col-md-4 mb-4">
                <div class="card text-white bg-success shadow-sm">
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="card-title">Tâches Terminées</h5>
                            <p class="card-text fs-3 fw-bold">{{ stats.completed }}</p>
                        </div>
                        <i class="bi bi-check-circle-fill fs-1"></i>
                    </div>
                </div>
            </div>

            <!-- Carte Tâches en Cours -->
            <div class="col-md-4 mb-4">
                <div class="card text-white bg-warning shadow-sm">
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="card-title">Tâches en Cours</h5>
                            <p class="card-text fs-3 fw-bold">{{ stats.inProgress }}</p>
                        </div>
                        <i class="bi bi-hourglass-split fs-1"></i>
                    </div>
                </div>
            </div>

            <!-- Carte Tâches en Attente -->
            <div class="col-md-4 mb-4">
                <div class="card text-white bg-danger shadow-sm">
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="card-title">Tâches en Attente</h5>
                            <p class="card-text fs-3 fw-bold">{{ stats.pending }}</p>
                        </div>
                        <i class="bi bi-exclamation-circle-fill fs-1"></i>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import api from "../utils/axios";
import { ref, onMounted } from "vue";

export default {
    setup() {
        const stats = ref({ completed: 0, inProgress: 0, pending: 0 });

        const loading = ref(true);
        const error = ref(null);

        //Fonction de filtrage
        const fetchDashboardData = async () => {
            try {
                const response = await api.get("/tasks"); // Utilisation de la route avec le token dynamiquement !
                const tasks = response.data;
                stats.value.completed = tasks.filter((t) => t.status === "terminé").length;
                stats.value.inProgress = tasks.filter((t) => t.status === "en cours").length;
                stats.value.pending = tasks.filter((t) => t.status === "en attente").length;
            } catch (err) {
                error.value = "Impossible de récupérer les données. Veuillez réessayer.";
            } finally {
                loading.value = false;
            }
        };

        onMounted(fetchDashboardData);

        return { stats, loading, error };
    },

};
</script>




<style scoped>
/* Personnalisation du style */
.card-body {
    font-size: 18px;
}

.card-title {
    font-weight: bold;
}

.fs-1 {
    font-size: 2.5rem;
}
</style>
