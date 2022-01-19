/** @format */

import axios from "../helpers/axios";
import { productConstants } from "./constants";

// new action
export const getProducts = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/products`);
      if (res.status === 200) {
        const { Products } = res.data;

        dispatch({
          type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
          payload: { products: Products },
        });
      } else {
        dispatch({ type: productConstants.GET_ALL_PRODUCTS_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// modified actrion
export const addProduct = (form) => {
  return async (dispatch) => {
    const name = form.get("name");
    const price = form.get("price");
    const skuCode = form.get("skuCode");
    const S_size = form.get("S_quantity");
    const M_size = form.get("M_quantity");
    const X_size = form.get("X_quantity");
    const XL_size = form.get("XL_quantity");
    const X2L_size = form.get("X2L_quantity");
    const X3L_size = form.get("X3L_quantity");
    const description = form.get("description");
    const color = form.get("color").split(",");
    const category = form.get("category");
    console.log("this is category");
    console.log(category);

    let productPictures;
    try {
      const res = await axios.post(`/uploads/images`, form);
      productPictures = res.data.arr;
    } catch (err) {
      console.log(err);
    }
    try {
      const obj = {
        products: {
          name,
          price,
          skuCode,
          S_size,
          M_size,
          X_size,
          XL_size,
          X2L_size,
          X3L_size,
          description,
          color,
          category,
          productPictures,
        },
      };

      console.log(obj, "object to send");

      const res = await axios.post(`/product/create`, obj);
      if (res.status === 200) {
        dispatch({ type: productConstants.ADD_PRODUCT_SUCCESS });
        dispatch(getProducts());
      } else {
        dispatch({ type: productConstants.ADD_PRODUCT_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// new action
export const deleteProductById = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`product/deleteProductById`, {
        data: { payload },
      });
      dispatch({ type: productConstants.DELETE_PRODUCT_BY_ID_REQUEST });
      if (res.status === 202) {
        dispatch({ type: productConstants.DELETE_PRODUCT_BY_ID_SUCCESS });
        dispatch(getProducts());
      } else {
        const { error } = res.data;
        dispatch({
          type: productConstants.DELETE_PRODUCT_BY_ID_FAILURE,
          payload: {
            error,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
