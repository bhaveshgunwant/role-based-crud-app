import axios from "axios";

const API = axios.create({
  baseURL: "https://role-based-crud-app.onrender.com/api",
  withCredentials: true 
});

export default API;