<template>
    <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div class="card shadow-lg p-2 rounded" style="width: 400px;">
            <div class="text-center">
                <i class="bi bi-person-circle text-primary" style="font-size: 3rem;"></i>
                <h3 class="mt-2">Connexion</h3>
            </div>

            <!-- Affichage des erreurs générales -->
            <div v-if="errorMessage" class="alert alert-danger py-2 text-center">
                {{ errorMessage }}
            </div>

            <form @submit.prevent="handleLogin">
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" v-model="email" class="form-control" placeholder="Entrez votre email"
                        required />
                    
                    <small v-if="errors.email" class="text-danger">{{ errors.email }}</small>
                </div>

                <div class="mb-3">
                    <label for="password" class="form-label">Mot de passe</label>
                    <input type="password" v-model="password" class="form-control"
                        placeholder="Entrez votre mot de passe" required />
                    <small v-if="errors.password" class="text-danger">{{ errors.password }}</small>
                </div>

                <button type="submit" class="btn btn-primary w-100 fw-bold">
                    <i class="bi bi-box-arrow-in-right"></i> Se connecter
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

export default {
    setup() {
        const email = ref("");
        const password = ref("");
        const errorMessage = ref(null);
        const errors = ref({});  // Pour stocker les erreurs spécifiques de validation
        const authStore = useAuthStore();
        const router = useRouter();

        const handleLogin = async () => {
            try {
                // Réinitialiser les erreurs
                errors.value = {};

                // Tentative de connexion via authStore
                await authStore.login(email.value, password.value);

                if (authStore.token) {
                    // Redirection vers le dashboard si le login est réussi
                    router.push("/dashboard");
                }
            } catch (error) {
                // Si le backend retourne des erreurs spécifiques
                if (error.response && error.response.data.errors) {
                    // Les erreurs peuvent être sous la forme d'un objet avec des clés pour chaque champ
                    errors.value = error.response.data.errors;

                    // Erreur générale si disponible (message global)
                    errorMessage.value = error.response.data.message || "Une erreur est survenue.";
                } else {
                    // Gestion des erreurs générales si le backend ne renvoie pas de détails
                    errorMessage.value = "Email ou mot de passe incorrect.";
                }
            }
        };

        return { email, password, handleLogin, errorMessage, errors };
    },
};
</script>
