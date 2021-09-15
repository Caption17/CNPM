const initialState = localStorage.getItem("carts")
  ? JSON.parse(localStorage.getItem("carts"))
  : [];

const handleReducer = {
  ADD_TO_CARTS(state, action) {
    const products = JSON.parse(localStorage.getItem("products"));
    const carts = [...state];
    const cart = carts.find((c) => c.id === action.payload.id);
    const product = products.find((p) => p.id === action.payload.id);
    let notify = null;
    if (action.payload.total <= product.total) {
      if (cart) {
        cart.total += action.payload.total;
      } else {
        carts.push(action.payload);
      }
      product.total -= action.payload.total;
      localStorage.setItem("products", JSON.stringify(products));
      localStorage.setItem("carts", JSON.stringify(carts));
      notify = {
        id: product.id,
        type: "success",
        message: "Thêm vào giỏ hàng thành công",
        title: "Thành Công",
        duration: 3000,
      };
    } else {
      notify = {
        id: product.id,
        type: "error",
        message: "Thêm vào giỏ hàng thất bại",
        title: "Thất Bại",
        duration: 3000,
      };
    }
    localStorage.setItem("notification", JSON.stringify(notify));
    return carts;
  },
  INCREASE_CART(state, action) {
    const products = JSON.parse(localStorage.getItem("products"));
    const carts = [...state];
    const cart = carts.find((c) => c.id === action.payload);
    const product = products.find((p) => p.id === action.payload);
    let notify = null;
    if (product.total > 0) {
      cart.total++;
      product.total--;
      localStorage.setItem("products", JSON.stringify(products));
      localStorage.setItem("carts", JSON.stringify(carts));
      notify = {
        id: product.id,
        type: "success",
        message: "Cập nhật giỏ hàng thành công",
        title: "Thành Công",
        duration: 3000,
      };
    } else {
      notify = {
        id: product.id,
        type: "error",
        message: "Số lượng sản phẩm không đủ để cung cấp",
        title: "Thất bại",
        duration: 3000,
      };
    }
    localStorage.setItem("notification", JSON.stringify(notify));
    return carts;
  },
  REDUCTION_CART(state, action) {
    const products = JSON.parse(localStorage.getItem("products"));
    const carts = [...state];
    const cart = carts.find((c) => c.id === action.payload);
    const product = products.find((p) => p.id === action.payload);
    let notify = null;
    if (cart.total > 1) {
      cart.total--;
      product.total++;
      localStorage.setItem("products", JSON.stringify(products));
      localStorage.setItem("carts", JSON.stringify(carts));
      notify = {
        id: product.id,
        type: "success",
        message: "Cập nhật giỏ hàng thành công",
        title: "Thành Công",
        duration: 3000,
      };
    } else {
      notify = {
        id: product.id,
        type: "error",
        message: "Số lượng sản phẩm tối thiểu là 1",
        title: "Thất bại",
        duration: 3000,
      };
    }
    localStorage.setItem("notification", JSON.stringify(notify));
    return carts;
  },
  CHANGE_CART_TOTAL(state, action) {
    const products = JSON.parse(localStorage.getItem("products"));
    const carts = [...state];
    const cart = carts.find((c) => c.id === action.payload.id);
    const product = products.find((p) => p.id === action.payload.id);
    let notify = {
      id: product.id,
      type: "error",
      message: "Thất bại",
      title: "Thất bại",
      duration: 3000,
    };
    if (action.payload.total <= product.total + cart.total) {
      product.total = product.total + cart.total - action.payload.total;
      cart.total = action.payload.total;
      localStorage.setItem("products", JSON.stringify(products));
      localStorage.setItem("carts", JSON.stringify(carts));
      notify = {
        id: product.id,
        type: "success",
        message: "Cập nhật giỏ hàng thành công",
        title: "Thành Công",
        duration: 3000,
      };
    }
    localStorage.setItem("notification", JSON.stringify(notify));
    return carts;
  },
  REMOVE_CART(state, action) {
    const products = JSON.parse(localStorage.getItem("products"));
    const carts = [...state];
    const cart = carts.find((c) => c.id === action.payload);
    const product = products.find((p) => p.id === action.payload);
    let notify = {
      id: product.id,
      type: "error",
      message: "Xóa không thành công",
      title: "Thất bại",
      duration: 3000,
    };
    console.log(notify);
    if (product && cart) {
      product.total += cart.total;
      localStorage.setItem("products", JSON.stringify(products));
      const cartsNew = [...carts].filter((c) => c.id !== action.payload);
      notify = {
        id: product.id,
        type: "success",
        message: "Xóa thành công",
        title: "Thành công",
        duration: 3000,
      };
      console.log(notify);
      localStorage.setItem("notification", JSON.stringify(notify));
      localStorage.setItem("carts", JSON.stringify(cartsNew));
      return cartsNew;
    }
    localStorage.setItem("notification", JSON.stringify(notify));
    return carts;
  },
  REMOVE_ALL(state, action) {
    const carts = [...state];
    const products = JSON.parse(localStorage.getItem("products"));
    carts.forEach((c) => {
      const product = products.find((p) => p.id === c.id);
      if (product) {
        product["total"] += c["total"];
      }
    });
    let notify = {
      id: 0,
      type: "success",
      message: "Xóa thành công",
      title: "Thành công",
      duration: 3000,
    };
    localStorage.setItem("notification", JSON.stringify(notify));
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("carts", JSON.stringify([]));
    return [];
  },
};

const cartReducer = (state = initialState, action) => {
  console.log("cartReducer", action);
  return handleReducer[action.type]
    ? handleReducer[action.type](state, action)
    : state;
};
export default cartReducer;
