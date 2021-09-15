import { InitialProduct } from "../constant/InitialProduct";

localStorage.setItem(
  "products",
  localStorage.getItem("products") || JSON.stringify(InitialProduct.products)
);

const initialState = JSON.parse(localStorage.getItem("products"));

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export default productReducer;
