import { combineReducers } from "redux";
import productReducer from "./Product";
import cartReducer from "./Cart";
import notificationReducer from "./Notification";

const rootReducer = combineReducers({
  products: productReducer,
  carts: cartReducer,
  notifications: notificationReducer,
});

export default rootReducer;
