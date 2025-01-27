import { api } from "../../config/apiConfig";
import { FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS } from "./ActionType";

export const findProducts = (reqData) => async(dispatch)=> {

    dispatch({type:FIND_PRODUCTS_REQUEST});


    const {colors,sizes,minPrice,maxPrice,minDiscount,category,stock,sort,pageNumber,pageSize} = reqData;

        // Convert empty arrays to null
  
  // Convert colors and sizes to comma-separated strings
  const colorsParam = colors ? colors : null; // Already a comma-separated string
  const sizesParam = sizes ? sizes : null;   // Already a comma-separated string
  
    try {
        
        const { data } = await api.get(`api/products/all`, {
            params: {
              category,
              colors: colorsParam,
              sizes: sizesParam,
              minPrice,
              maxPrice,
              minDiscount,
              stock,
              sort,
              pageNumber,
              pageSize,
            },
          });
          
    console.log("Product DATA : ", data);
    dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
      
    } catch (error) {
        dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
    }
};




export const findProductById = (reqData) => async(dispatch)=> {

    dispatch({type:FIND_PRODUCT_BY_ID_REQUEST});

    const {productId} = reqData;
    try {
        
        const {data} = await api.get(`api/products/${productId}`);
        console.log("GET BY ID ",data);

        dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
      
    } catch (error) {
        dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
    }
};