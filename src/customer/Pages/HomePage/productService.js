import { api } from "../../../config/apiConfig";


export const fetchProductsByCategory = async (category) => {
  try {
    const response = await api.get(`api/products/category/${category}`);
    console.log("FETCH RESPONSE : : : :",response)
    return response.data.data; // Adjust if response structure is different
  } catch (error) {
    console.error(`Error fetching products for category "${category}":`, error);
    return [];
  }
};