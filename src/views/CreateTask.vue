<template>
    <div class="container mt-4">
        <h3>Créer une tâche</h3>
        <form @submit.prevent="createTask">
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
            <button class="btn btn-success">Créer</button>
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
        };
    },
    methods: {
        async createTask() {
            try {
                await api.post("/tasks", {
                    title: this.title,
                    description: this.description,
                    due_date: this.due_date,
                });
                alert("Tâche créée !");
                this.$router.push("/tasks");
            } catch (error) {
                alert("Erreur lors de la création de la tâche.");
            }
        },
    },
};
</script>
