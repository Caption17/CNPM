export const addToCarts = (payload) => {
  return {
    type: "ADD_TO_CARTS",
    payload: payload,
  };
};
export const increaseCarts = (payload) => {
  console.log({
    type: "INCREASE_CART",
    payload: payload,
  });
  return {
    type: "INCREASE_CART",
    payload: payload,
  };
};
export const reductionCarts = (payload) => {
  return {
    type: "REDUCTION_CART",
    payload: payload,
  };
};
export const changeCartsTotal = (payload) => {
  return {
    type: "CHANGE_CART_TOTAL",
    payload: payload,
  };
};
export const removeCart = (payload) => {
  return {
    type: "REMOVE_CART",
    payload: payload,
  };
};
export const removeAll = () => {
  return {
    type: "REMOVE_ALL",
  };
};
