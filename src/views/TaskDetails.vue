<template>
    <div class="container mt-4">
        <div v-if="task">
            <h2>{{ task.title }}</h2>
            <p><strong>Description :</strong> {{ task.description }}</p>
            <p><strong>Statut :</strong> {{ statusLabel(task.status) }}</p>
            <p><strong>Échéance :</strong> {{ task.due_date }}</p>
            <router-link :to="'/tasks/edit/' + task.id" class="btn btn-warning me-2">Modifier</router-link>
            <button class="btn btn-danger" @click="deleteTask">Supprimer</button>
        </div>
        <div v-else>
            <p>Chargement en cours...</p>
        </div>
    </div>
</template>

<script>
import api from "../utils/axios";

export default {
    data() {
        return {
            task: null,
        };
    },
    async mounted() {
        const id = this.$route.params.id;
        try {
            const { data } = await api.get(`/tasks/${id}`);
            this.task = data;
        } catch (error) {
            alert("Tâche introuvable.");
            this.$router.push("/tasks");
        }
    },
    methods: {
        statusLabel(status) {
            switch (status) {
                case "todo": return "À faire";
                case "in_progress": return "En cours";
                case "done": return "Terminée";
                default: return status;
            }
        },
        async deleteTask() {
            if (confirm("Voulez-vous vraiment supprimer cette tâche ?")) {
                try {
                    await api.delete(`/tasks/${this.task.id}`);
                    alert("Tâche supprimée.");
                    this.$router.push("/tasks");
                } catch (error) {
                    alert("Erreur lors de la suppression.");
                }
            }
        }
    },
};
</script>
