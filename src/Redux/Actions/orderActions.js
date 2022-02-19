import axios from 'axios';
import {
  CLEAR_ERRORS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
} from '../Constants/orderConstants';

export const newOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_ORDER_REQUEST,
    });
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };
    const { data } = await axios.post(`/api/v1/order/new`, order, config);
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Cleat Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
