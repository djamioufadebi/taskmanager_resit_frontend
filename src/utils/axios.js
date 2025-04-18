import axios from "axios";

// Création de l'instance Axios
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// Ajout d'un "interceptor" pour injecter le token à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
