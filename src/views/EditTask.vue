<template>
    <div class="container mt-4">
        <h3>Modifier la tâche</h3>
        <form @submit.prevent="updateTask">
            <div class="mb-3">
                <label>Titre</label>
                <input v-model="title" class="form-control" required />
            </div>
            <div class="mb-3">
                <label>Description</label>
                <textarea v-model="description" class="form-control" required></textarea>
            </div>
            <div class="mb-3">
                <label>Date d’échéance</label>
                <input type="date" v-model="due_date" class="form-control" />
            </div>
            <div class="mb-3">
                <label>Statut</label>
                <select v-model="status" class="form-select">
                    <option value="todo">À faire</option>
                    <option value="in_progress">En cours</option>
                    <option value="done">Terminée</option>
                </select>
            </div>
            <button class="btn btn-primary">Mettre à jour</button>
        </form>
    </div>
</template>

<script>
import api from "../utils/axios";

export default {
    data() {
        return {
            title: "",
            description: "",
            due_date: "",
            status: "todo",
        };
    },
    async mounted() {
        const { id } = this.$route.params;
        try {
            const { data } = await api.get(`/tasks/${id}`);
            this.title = data.title;
            this.description = data.description;
            this.due_date = data.due_date;
            this.status = data.status;
        } catch (e) {
            alert("Tâche introuvable");
            this.$router.push("/tasks");
        }
    },
    methods: {
        async updateTask() {
            try {
                await api.put(`/tasks/${this.$route.params.id}`, {
                    title: this.title,
                    description: this.description,
                    due_date: this.due_date,
                    status: this.status,
                });
                alert("Tâche mise à jour !");
                this.$router.push("/tasks");
            } catch (error) {
                alert("Erreur de mise à jour !");
            }
        },
    },
};
</script>
