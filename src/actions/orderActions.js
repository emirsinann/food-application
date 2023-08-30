// actions/orders.js
import axios from '../api/axios';

export const fetchUserOrders = () => async (dispatch, getState) => {
  try {
    const response = await axios.get('/order', {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    console.log(response.data);
    dispatch({ type: 'FETCH_USER_ORDERS_SUCCESS', payload: response.data });
  } catch (error) {
    console.error(error);
    dispatch({ type: 'FETCH_USER_ORDERS_FAILURE' });
  }
};