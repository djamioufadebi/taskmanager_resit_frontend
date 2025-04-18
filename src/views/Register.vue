<template>
    <div class="register-form-container mb-5">
        <h2 class="text-center mb-4">S'inscrire</h2>

        <form @submit.prevent="register" class="form-group">
            <!-- Champ Nom -->
            <div class="mb-3">
                <label for="name" class="form-label">Nom</label>
                <input type="text" id="name" v-model="form.name" class="form-control" placeholder="Entrez votre nom"
                    required />
                <small v-if="errors.name" class="text-danger">{{ errors.name }}</small>
            </div>

            <!-- Champ Email -->
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" v-model="form.email" class="form-control"
                    placeholder="Entrez votre email" required />
                <small v-if="errors.email" class="text-danger">{{ errors.email }}</small>
            </div>

            <!-- Champ Mot de passe -->
            <div class="mb-3">
                <label for="password" class="form-label">Mot de passe</label>
                <input type="password" id="password" v-model="form.password" class="form-control"
                    placeholder="Entrez votre mot de passe" required />
                <small v-if="errors.password" class="text-danger">{{ errors.password }}</small>
            </div>

            <!-- Champ Confirmer le mot de passe -->
            <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirmer le mot de passe</label>
                <input type="password" id="confirmPassword" v-model="form.confirmPassword" class="form-control"
                    placeholder="Confirmez votre mot de passe" required />
                <small v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</small>
            </div>

            <button type="submit" class="btn btn-primary w-100">S'inscrire</button>

            <!-- Lien vers la page de connexion -->
            <div class="d-flex justify-content-between mt-3">
                <label for="confirmPassword" class="form-label">Vous avez déjà un compte ?</label>
                <router-link :to="{ name: 'login' }">Se connecter</router-link>
            </div>
        </form>
    </div>
</template>

<script>
import api from "../utils/axios";

export default {
    data() {
        return {
            form: {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
            },
            errors: {} 
        };
    },
    methods: {
        // Méthode d'inscription
        async register() {
            // Réinitialisation des erreurs avant chaque tentative
            this.errors = {};

            // Validation simple du mot de passe côté client
            if (this.form.password !== this.form.confirmPassword) {
                this.errors.confirmPassword = "Les mots de passe ne correspondent pas.";
                return;
            }

            try {
                // Envoi de la requête d'inscription
                const response = await api.post('/register', {
                    name: this.form.name,
                    email: this.form.email,
                    password: this.form.password,
                });

                // Notification de succès
                alert(`Inscription réussie pour ${this.form.name} (${this.form.email})`);

                // Redirection vers la page de connexion
                this.$router.push({ name: 'login' });
            } catch (error) {
                if (error.response && error.response.data) {
                   
                    //this.errors = error.response.data.errors;
                    // Vérifions si l'erreur est sous forme de tableau pour récupérer le premier message
                    for (const [key, value] of Object.entries(error.response.data.errors || {})) {
                        if (Array.isArray(value)) {
                            // Si la valeur est un tableau, on récupère le premier message
                            this.errors[key] = value[0];
                        } else {
                            this.errors[key] = value;
                        }
                    }
                } else {
                    // Erreur générique en cas de problème avec l'API
                    alert('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
                }
            }
        }
    }
};
</script>



<style scoped>
.register-form-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 30px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h2 {
    font-weight: bold;
}

.form-group {
    margin-bottom: 20px;
}
</style>
