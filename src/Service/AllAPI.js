import { commonAPI } from "./CommonAPI"
import { SERVER_URL } from "./ServerUrl"
import axios from 'axios'

export const verifyPinAPI = async(pin) => {
    return await commonAPI("GET",`${SERVER_URL}/api/menu/${pin}/table/`,"","") 
}

export const getSignupsAPI = async() => {
    return await commonAPI("GET",`${SERVER_URL}/api/signup/`,"","")
}

export const getTableDataAPI = async(pin) => {
    return await commonAPI("GET",`${SERVER_URL}/api/menu/${pin}/table/`,"","")
}

export const getAllCategoriesAPI = async(pin) => {
    return await commonAPI("GET",`${SERVER_URL}/api/menu/${pin}/category/`,"","")
}

export const getAllMenuAPI = async(pin)=>{
    return await commonAPI("GET", `${SERVER_URL}/api/menu/${pin}/food`,"","")
}

export const addToCartAPI = async(reqBody,reqHeader) => {  
    return await commonAPI("POST",`${SERVER_URL}/api/cart/`,reqBody,reqHeader)
}

export const getCartAPI = async(tableID) => {
    return await commonAPI("GET",`${SERVER_URL}/api/cart/${tableID}/`,"","")  
}

export const incrementCartItemAPI = async (id, action) => {
    return await commonAPI("POST", `${SERVER_URL}/api/cart/update-quantity/`, { cart_id: id, action });
};
export const emptyCartAPI = async (tableID) => {
    return await axios.delete(`${SERVER_URL}/api/cart/empty/${tableID}/`);
};
export const addCheckoutAPI = async (reqBody, reqHeader) => {
    return await axios.post(`${SERVER_URL}/api/checkout/`, reqBody, { headers: reqHeader });
  };
export const getCheckoutAPI = async (tableID) => {
    return await axios.get(`${SERVER_URL}/api/checkout/${tableID}/`); 
}