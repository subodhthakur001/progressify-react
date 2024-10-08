import axios from "axios";
 
const apiurl = process.env.VITE_API_BASE_URL;
const API = axios.create({
  baseURL: apiurl,
});
 
API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("token"))?.response?.token;
    }`;
  }
  return req;
});