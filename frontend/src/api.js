import axios from "axios";

// Base URL of the Spring Boot backend (set VITE_API_URL to change it)
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8081";

const api = axios.create({
  baseURL: `${BASE_URL}/WebsiteMaintenancePlan`,
});

export const getPlans = () => api.get("/DisplayAll");
export const addPlan = (plan) => api.post("/Add", plan);
export const deletePlan = (id) => api.delete(`/Delete/${id}`);
