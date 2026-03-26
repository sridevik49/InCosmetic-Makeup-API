import axios from "axios";

const API_URL = "http://makeup-api.herokuapp.com/api/v1/products.json";

export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};