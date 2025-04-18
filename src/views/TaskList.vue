
<!-- <template>
    <div class="container-fluid py-4">

        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="fw-bold text-primary">Gestion des Tâches</h2>
        </div>
        <div class="row">

            <div class="col-md-5">


                
                <div v-if="successMessage" class="alert alert-success alert-dismissible fade show" role="alert">
                    {{ successMessage }}
                    <button type="button" class="btn-close" @click="successMessage = ''"></button>
                </div>

             
                <div class="card shadow-sm border-0 mb-4">
                    <div class="card-header bg-light">
                        <h5 class="mb-0 text-secondary">Créer une nouvelle tâche</h5>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="createTask">
                            <div class="row g-3">
                                <div class="col-md-4">
                                    <input v-model="newTask.title" class="form-control" placeholder="Titre de la tâche"
                                        required />
                                </div>
                                <div class="col-md-4">
                                    <textarea v-model="newTask.description" class="form-control"
                                        placeholder="Description" />
                                </div>
                                <div class="col-md-2">
                                    <select v-model="newTask.status" class="form-select">
                                        <option value="en attente">En attente</option>
                                        <option value="en cours">En cours</option>
                                        <option value="terminé">Terminé</option>
                                    </select>
                                </div>
                                <div class="col-md-2">
                                    <button class="btn btn-primary w-100" type="submit">Ajouter</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-7">
               
                <div class="row align-items-center mb-4">
                    <div class="col-md-5">
                        <input v-model="searchQuery" class="form-control" placeholder="Rechercher une tâche..."
                            @input="fetchTasks" />
                    </div>
                    <div class="col-md-3">
                        <select v-model="statusFilter" class="form-select" @change="fetchTasks">
                            <option value="">Tous les statuts</option>
                            <option value="en_attente">En attente</option>
                            <option value="en cours">En cours</option>
                            <option value="terminé">Terminé</option>
                        </select>
                    </div>
                </div>

               
                <div v-if="loading" class="text-center py-4">
                    <div class="spinner-border text-primary" role="status"></div>
                </div>

               
                <div v-else class="table-responsive shadow-sm rounded">
                    <table class="table table-hover align-middle">

                        <thead class="table-light">
                            <tr>
                                <th>Titre</th>
                                <th>Description</th>
                                <th>Statut</th>
                                <th class="text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody v-if="tasks.length">
                            <tr v-for="task in tasks" :key="task.id">
                                <td>{{ task.title }}</td>
                                <td>{{ task.description }}</td>
                                <td>
                                    <select v-model="task.status" class="form-select" @change="updateTask(task)">
                                        <option value="en_attente">En attente</option>
                                        <option value="en_cours">En cours</option>
                                        <option value="terminé">Terminé</option>
                                    </select>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center gap-2">
                                        <button class="btn btn-sm btn-outline-success"
                                            @click="viewTask(task)">Voir</button>
                                        <button class="btn btn-sm btn-outline-warning"
                                            @click="openEditModal(task)">Modifier</button>
                                        <button class="btn btn-sm btn-outline-danger"
                                            @click="confirmDelete(task.id)">Supprimer</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>

                        <tbody v-else>
                            <tr>
                                <td colspan="4" class="text-center text-muted">Aucune tâche trouvée.</td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>
        </div> 


        <div class="modal fade" id="taskModal" tabindex="-1" aria-labelledby="taskModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ isEditing ? 'Modifier la tâche' : 'Détails de la tâche' }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="updateTask">
                            <div class="mb-3">
                                <label for="title" class="form-label">Titre</label>
                                <input type="text" id="title" v-model="selectedTask.title" class="form-control"
                                    :disabled="!isEditing" required />
                            </div>
                            <div class="mb-3">
                                <label for="description" class="form-label">Description</label>
                                <textarea id="description" v-model="selectedTask.description" class="form-control"
                                    :disabled="!isEditing"></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="status" class="form-label">Statut</label>
                                <select id="status" v-model="selectedTask.status" class="form-select"
                                    :disabled="!isEditing">
                                    <option value="en attente">En attente</option>
                                    <option value="en cours">En cours</option>
                                    <option value="terminé">Terminé</option>
                                </select>
                            </div>
                            <button v-if="isEditing" type="submit" class="btn btn-primary w-100">Enregistrer</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
       
        <div class="modal fade" id="deleteTaskModal" tabindex="-1" aria-labelledby="deleteTaskLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Confirmer la suppression</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">Êtes-vous sûr de vouloir supprimer cette tâche ?</div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                        <button type="button" class="btn btn-danger" @click="deleteTask">Supprimer</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-between align-items-center mt-4">
            <button class="btn btn-outline-secondary" :disabled="currentPage === 1"
                @click="changePage(currentPage - 1)">
                &laquo; Précédent
            </button>
            <span class="fw-bold">Page {{ currentPage }} / {{ totalPages }}</span>
            <button class="btn btn-outline-secondary" :disabled="currentPage === totalPages"
                @click="changePage(currentPage + 1)">
                Suivant &raquo;
            </button>
        </div>
    </div>
</template>-->

<template>
    <div class="container-fluid py-4">
        <!-- Titre principal -->
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="fw-bold text-primary"> Gestion des Tâches</h2>
        </div>

        <div class="row g-4">
            <!-- Formulaire de création -->
            <div class="col-lg-4">
                <!-- Message de succès -->
                <div v-if="successMessage" class="alert alert-success alert-dismissible fade show" role="alert">
                    {{ successMessage }}
                    <button type="button" class="btn-close" @click="successMessage = ''"></button>
                </div>

                <div class="card shadow-sm border-0">
                    <div class="card-header bg-light text-secondary fw-bold">Créer une nouvelle tâche</div>
                    <div class="card-body">
                        <form @submit.prevent="createTask">
                            <div class="mb-3">
                                <input v-model="newTask.title" class="form-control" placeholder="Titre de la tâche"
                                    required />
                            </div>
                            <div class="mb-3">
                                <textarea v-model="newTask.description" class="form-control" placeholder="Description"
                                    rows="3" />
                            </div>
                            <div class="mb-3">
                                <select v-model="newTask.status" class="form-select">
                                    <option value="en attente">En attente</option>
                                    <option value="en cours">En cours</option>
                                    <option value="terminé">Terminé</option>
                                </select>
                            </div>
                            <button class="btn btn-primary w-100" type="submit">Ajouter la tâche</button>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Liste et filtre des tâches -->
            <div class="col-lg-8">
                <!-- Barre de recherche et filtre -->
                <div class="row g-3 align-items-center mb-3">
                    <div class="col-md-6">
                        <input v-model="searchQuery" class="form-control" placeholder="Rechercher une tâche..."
                            @input="fetchTasks" />
                    </div>
                    <div class="col-md-4">
                        <select v-model="statusFilter" class="form-select" @change="fetchTasks">
                            <option value="">Tous les statuts</option>
                            <option value="en attente">En attente</option>
                            <option value="en cours">En cours</option>
                            <option value="terminé">Terminé</option>
                        </select>
                    </div>
                </div>

                <!-- Chargement -->
                <div v-if="loading" class="text-center py-4">
                    <div class="spinner-border text-primary" role="status"></div>
                </div>

                <!-- Tableau -->
                <div v-else class="table-responsive shadow-sm rounded">
                    <table class="table table-hover align-middle">
                        <thead class="table-light">
                            <tr>
                                <th >Titre</th>
                                <th>Description</th>
                                <th>Statut</th>
                                <th class="text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody v-if="tasks.length">
                            <tr v-for="task in tasks" :key="task.id">
                                <td>{{ task.title }}</td>
                                <td class="text-truncate" style="max-width: 200px;">{{ task.description }}</td>
                                <td>
                                    <select v-model="task.status" class="form-select form-select-sm"
                                        @change="updateTask(task)">
                                        <option value="en attente">En attente</option>
                                        <option value="en cours">En cours</option>
                                        <option value="terminé">Terminé</option>
                                    </select>
                                </td>
                                <td class="text-end">
                                    <!-- Dropdown Bootstrap -->
                                    <div class="dropdown">
                                        <button class="btn btn-sm btn-outline-primary dropdown-toggle" type="button"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                            Actions
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-end">
                                            <li><a class="dropdown-item" href="#" @click.prevent="viewTask(task)">
                                                    Voir</a></li>
                                            <li><a class="dropdown-item" href="#" @click.prevent="openEditModal(task)">
                                                    Modifier</a></li>
                                            <li>
                                                <hr class="dropdown-divider" />
                                            </li>
                                            <li><a class="dropdown-item text-danger" href="#"
                                                    @click.prevent="confirmDelete(task.id)">Supprimer</a></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="4" class="text-center text-muted">Aucune tâche trouvée.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div class="d-flex justify-content-between align-items-center mt-4">
                    <button class="btn btn-outline-secondary" :disabled="currentPage === 1"
                        @click="changePage(currentPage - 1)">
                        &laquo; Précédent
                    </button>
                    <span class="fw-bold">Page {{ currentPage }} / {{ totalPages }}</span>
                    <button class="btn btn-outline-secondary" :disabled="currentPage === totalPages"
                        @click="changePage(currentPage + 1)">
                        Suivant &raquo;
                    </button>
                </div>
            </div>
        </div>

        <div class="modal fade" id="taskModal" tabindex="-1" aria-labelledby="taskModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ isEditing ? 'Modifier la tâche' : 'Détails de la tâche' }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="updateTask">
                            <div class="mb-3">
                                <label for="title" class="form-label">Titre</label>
                                <input type="text" id="title" v-model="selectedTask.title" class="form-control"
                                    :disabled="!isEditing" required />
                            </div>
                            <div class="mb-3">
                                <label for="description" class="form-label">Description</label>
                                <textarea id="description" v-model="selectedTask.description" class="form-control"
                                    :disabled="!isEditing"></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="status" class="form-label">Statut</label>
                                <select id="status" v-model="selectedTask.status" class="form-select"
                                    :disabled="!isEditing">
                                    <option value="en attente">En attente</option>
                                    <option value="en cours">En cours</option>
                                    <option value="terminé">Terminé</option>
                                </select>
                            </div>
                            <button v-if="isEditing" type="submit" class="btn btn-primary w-100">Enregistrer</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="deleteTaskModal" tabindex="-1" aria-labelledby="deleteTaskLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Confirmer la suppression</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">Êtes-vous sûr de vouloir supprimer cette tâche ?</div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                        <button type="button" class="btn btn-danger" @click="deleteTask">Supprimer</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>



<script>
import { ref, computed, onMounted } from "vue";
import api from "../utils/axios";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

export default {
    setup() {
        const tasks = ref([]);
        const newTask = ref({ title: "", description: "", status: "en attente" });
        const selectedTask = ref({});
        const isEditing = ref(false);
        const taskToDelete = ref(null);
        const searchQuery = ref("");
        const statusFilter = ref("");
        const successMessage = ref("");
        const loading = ref(false);
        const currentPage = ref(1);
        const totalPages = ref(1);
        const perPage = 5; 

        const hideMessageAfterDelay = () => {
            setTimeout(() => {
                successMessage.value = "";
            }, 3000); // Cache le message après 3 secondes
        };

        const fetchTasks = async () => {
            loading.value = true;
            try {
                //console.log("Recherche en cours :", searchQuery.value); // Vérification
                const response = await api.get("/tasks", {
                    params: {
                        search: searchQuery.value || null, 
                        status: statusFilter.value || null,
                        page: currentPage.value,
                        perPage: perPage,
                    }
                });
                //console.log("Résultats récupérés :", response.data); 
                tasks.value = response.data;
                totalPages.value = response.data.totalPages;
            } catch (error) {
                console.error("Erreur lors de la récupération des tâches :", error);
                
            }
            finally {
                loading.value = false;
            }
        };

        /* const createTask = async () => {
            //loading.value = true;
            try {
                await api.post("/tasks", newTask.value);
                successMessage.value = "Tâche créée avec succès !";
                fetchTasks();
                newTask.value = { title: "", description: "", status: "en attente" };
                alert("Tâche créée avec succès!");
                hideMessageAfterDelay();
            } catch (error) {
                console.error("Erreur lors de la création de la tâche :", error);
            } 
        }; */

        const createTask = async () => {
            try {
                console.log("Nouvelle tâche à envoyer :", newTask.value);
                await api.post("/tasks", newTask.value);
                successMessage.value = "Tâche créée avec succès !";
                fetchTasks();
                newTask.value = { title: "", description: "", due_date: "", status: "en attente" };
                alert("Tâche créée avec succès !");
                hideMessageAfterDelay();
            } catch (error) {
                if (error.response) {
                    console.error("Erreur API :", error.response.data);
                    alert("Erreur lors de la création : " + (error.response.data.message || "Erreur inconnue"));
                } else {
                    console.error("Erreur inconnue :", error.message);
                }
            }
        };


        const viewTask = (task) => {
            selectedTask.value = { ...task };
            isEditing.value = false;
            new bootstrap.Modal(document.getElementById("taskModal")).show();
        };

        /* Mondal Modification de Tâches */
        const openEditModal = (task) => {
            selectedTask.value = { ...task };
            isEditing.value = true;
            new bootstrap.Modal(document.getElementById("taskModal")).show();
        };
        /*  Modification de Tâches */
        const updateTask = async () => {
            //loading.value = true;
            try {
                await api.put(`/tasks/${selectedTask.value.id}`, selectedTask.value);
                alert("Tâche modifiée avec succès");
                successMessage.value = "Tâche modifiée avec succès !";
                fetchTasks();
                const modalInstance = bootstrap.Modal.getInstance(document.getElementById("taskModal"));
                if (modalInstance) modalInstance.hide();
                hideMessageAfterDelay();
            } catch (error) {
                console.error("Erreur lors de la modification de la tâche :", error);
            } 
            /* finally {
                loading.value = false;
            } */
        };

        /* Mondal Suppression de Tâches */
        const confirmDelete = (taskId) => {
            taskToDelete.value = taskId;
            new bootstrap.Modal(document.getElementById("deleteTaskModal")).show();
        };
        /* Suppression de Tâches */
        const deleteTask = async () => {
            //loading.value = true;
            try {
                await api.delete(`/tasks/${taskToDelete.value}`);
                successMessage.value = "Tâche supprimée avec succès !";
                fetchTasks();
                const modalInstance = bootstrap.Modal.getInstance(document.getElementById("deleteTaskModal"));
                if (modalInstance) modalInstance.hide();
                hideMessageAfterDelay();
            } catch (error) {
                console.error("Erreur lors de la suppression de la tâche :", error);
            } 
            /* finally {
                loading.value = false;
            } */
        };

        // Gestion de la pagination
        const nextPage = () => {
            if (currentPage.value < totalPages.value) {
                currentPage.value++;
                fetchTasks();
            }
        };

        const prevPage = () => {
            if (currentPage.value > 1) {
                currentPage.value--;
                fetchTasks();
            }
        };

        const changePage = (page) => {
            if (page >= 1 && page <= totalPages.value) {
                currentPage.value = page;
                fetchTasks();
            }
        };

        onMounted(fetchTasks);

        return { tasks, newTask, selectedTask, isEditing, searchQuery, statusFilter,
             fetchTasks, createTask, viewTask, openEditModal, updateTask, confirmDelete, 
            deleteTask, loading,
            currentPage,
            totalPages,
            nextPage,
            prevPage,
            changePage, };
    },
};
</script>
