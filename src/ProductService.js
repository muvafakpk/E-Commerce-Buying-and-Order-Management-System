import axios from "axios";

const PRODUCT_API = "http://localhost:8080/api/products";

// Get all products
export const getAllProducts = () => {
  return axios.get(PRODUCT_API);
};

// Get products by category
export const getProductsByCategory = (category) => {
  return axios.get(`${PRODUCT_API}/category/${category}`);
};
