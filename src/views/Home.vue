<template>
    <div class="container my-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="fw-bold text-primary">Tableau de Bord</h2>
            <router-link to="/tasks/create" class="btn btn-success">
                <i class="bi bi-plus-circle me-1"></i> Nouvelle Tâche
            </router-link>
        </div>

        <div v-if="tasks.length" class="row row-cols-1 row-cols-md-2 g-4">
            <div v-for="task in tasks" :key="task.id" class="col">
                <div class="card shadow-sm border-0 h-100">
                    <div class="card-body">
                        <h5 class="card-title text-primary">{{ task.title }}</h5>
                        <p class="card-text text-muted">{{ task.description }}</p>
                        <p class="card-text">
                            <small class="text-secondary">
                             Échéance : <strong>{{ task.due_date }}</strong>
                            </small>
                        </p>
                        <div class="mt-3 d-flex flex-wrap gap-2">
                            <router-link :to="`/tasks/${task.id}`" class="btn btn-sm btn-outline-primary">
                                <i class="bi bi-eye"></i> Détails
                            </router-link>

                            <router-link :to="`/tasks/edit/${task.id}`" class="btn btn-sm btn-outline-warning">
                                <i class="bi bi-pencil-square"></i> Modifier
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="alert alert-info text-center">
            Aucune tâche disponible pour le moment. Cliquez sur <strong>Nouvelle Tâche</strong> pour en créer une.
        </div>
    </div>
</template>

<script>
import api from "../utils/axios";

export default {
    name: "Dashboard",
    data() {
        return {
            tasks: [],
        };
    },
    async mounted() {
        try {
            const { data } = await api.get("/tasks");
            this.tasks = data;
        } catch (error) {
            console.error("Erreur de chargement :", error);
            alert("Erreur lors du chargement des tâches.");
        }
    },
};
</script>

<style scoped>
.card-title {
    font-weight: 600;
}
</style>
