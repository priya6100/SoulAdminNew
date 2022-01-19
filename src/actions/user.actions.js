/** @format */

import axios from "../helpers/axios";
import { authConstants, userConstants } from "./constants";
import { Redirect } from "react-router-dom";

export const SignUp = (user) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });

    const res = await axios.post(`/admin/signup`, {
      ...user,
    });

    if (res.status === 201) {
      const { message } = res.data;

      dispatch({
        type: userConstants.USER_REGISTER_SUCCESS,
        payload: {
          message,
        },
      });
      alert("account created");
    } else {
      if (res.status === 400) {
        dispatch({
          type: userConstants.USER_REGISTER_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};
