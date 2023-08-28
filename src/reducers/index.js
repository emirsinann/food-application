import { combineReducers } from 'redux';
import cartReducer from './cartReducer'; // Import all your reducers here

const rootReducer = combineReducers({
  cartReducer,
  // add more reducers as needed
});

export default rootReducer;