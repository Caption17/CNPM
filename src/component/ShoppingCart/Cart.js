import React, { useCallback, useEffect, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  increaseCarts,
  reductionCarts,
  changeCartsTotal,
} from "../../actions/Cart";
import { createNotification } from "../../actions/Notification";
import "./ShoppingCart.css";
const ratioStyle = (_ratio) => ({
  ["--ratio"]: _ratio,
});
function Cart({ mouseEnter, cart }) {
  // const cart = useSelector((state) => {
  //   const notify = JSON.parse(localStorage.getItem("notification"));
  //   if (notify && notify.id === cartId) {
  //     dispatch(createNotification(notify));
  //   }
  //   // console.log(state.carts.find((c) => c.id === cartId));
  //   return state.carts.find((c) => c.id === cartId);
  // });
  const dispatch = useDispatch();
  const inputElm = useRef(null);
  const idTimeOut = useRef(null);
  const _this = useRef(null);
  const handleIncreaseCart = (id) => {
    dispatch(increaseCarts(id));
  };
  const handleRuductionCart = (id) => {
    dispatch(reductionCarts(id));
  };
  const handlChangeCart = (event) => {
    let call = true;
    if (!(event.which >= 48 && event.which <= 57)) {
      event.preventDefault();
      call = false;
    }
    if (call) {
      if (idTimeOut) {
        clearTimeout(idTimeOut.current);
      }
      idTimeOut.current = setTimeout(() => {
        if (event.target.value) {
          dispatch(
            changeCartsTotal({
              id: cart.id,
              total: parseInt(inputElm.current.value),
            })
          );
        }
      }, 500);
    }
  };
  const handleGetOffsetTop = () => {
    mouseEnter({ top: _this.current.offsetTop, id: cart.id });
  };
  const handleOnChangeCheckBox = (e) => {
    const root = e.target.closest(".product-list__inner");
    const checkboxList = Array.from(
      root.querySelectorAll('.cart-list input[type="checkbox"')
    );
    const checkAll = root.querySelector(".action-check");
    if (checkAll.matches(".action-checked")) {
      checkAll.classList.remove("action-checked");
      checkAll.querySelector("input").checked = false;
    }
    console.log(checkboxList);
    if (
      checkboxList.length === checkboxList.filter((item) => item.checked).length
    ) {
      checkAll.classList.add("action-checked");
    }
  };
  return (
    <>
      <div ref={_this} className="cart-item" onMouseEnter={handleGetOffsetTop}>
        <div style={ratioStyle(0.05)} className="cart-checkox cart-item-util">
          <input type="checkbox" onClick={handleOnChangeCheckBox} />
        </div>
        <div style={ratioStyle(0.2)} className="cart-avatar cart-item-util">
          <img src={cart.avatar} alt="ảnh sản phẩm" />
        </div>
        <div style={ratioStyle(0.35)} className="cart-name cart-item-util">
          <span>{cart.name}</span>
        </div>
        <div
          style={ratioStyle(0.2)}
          className="cart-amounts__wrapper cart-item-util"
        >
          <div className="cart-amounts">
            <button
              disabled={cart.total === 1}
              onClick={() => handleRuductionCart(cart.id)}
              className="btn-cart__reduction"
            >
              <i className="fas fa-minus"></i>
            </button>
            <input
              ref={inputElm}
              onKeyPress={handlChangeCart}
              className="cart-total__value"
              value={cart.total}
              type="text"
            />
            <button
              onClick={() => handleIncreaseCart(cart.id)}
              className="btn-cart__increase"
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>
        <div style={ratioStyle(0.2)} className="cart-price cart-item-util">
          <span className="curent-price">{cart.price}đ</span>
        </div>
      </div>
    </>
  );
}
export default Cart;
