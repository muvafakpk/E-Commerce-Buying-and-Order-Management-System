import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

// ---------- AUTH ----------
export const loginUser = (data) =>
  axios.post(`${BASE_URL}/employees/login`, data);

export const adminLogin = (data) =>
  axios.post(`${BASE_URL}/employees/admin/login`, data);

export const registerUser = (data) =>
  axios.post(`${BASE_URL}/employees`, data);

// ---------- PRODUCTS ----------
export const getProducts = () =>
  axios.get(`${BASE_URL}/products`);

// ---------- USERS (ADMIN) ----------
export const getUsers = () =>
  axios.get(`${BASE_URL}/employees`);

export const deleteUser = (id) =>
  axios.delete(`${BASE_URL}/employees/${id}`);

// ---------- ORDERS ----------
export const placeOrder = (order) =>
  axios.post(`${BASE_URL}/orders`, order);

export const getAllOrders = () =>
  axios.get(`${BASE_URL}/orders`);
