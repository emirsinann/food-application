import { ADD_TO_CART } from '../actions/cartActionTypes';
import { FETCH_PRODUCTS_SUCCESS } from '../actions/productActions';

const initialState = {
  cartItems: [], // Initialize an empty array for cart items
  products: [], // Initialize an empty array for products
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload], // Add the new product to cartItems
      };
      case FETCH_PRODUCTS_SUCCESS:
        return {
          ...state,
          products: action.payload, // Store fetched products in state
        };  
    default:
      return state;
  }
};

export default cartReducer;