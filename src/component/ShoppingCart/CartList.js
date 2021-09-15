import React, { useCallback, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { removeAll, removeCart } from "../../actions/Cart";
import { createNotification } from "../../actions/Notification";
import Cart from "./Cart";
import IconRemoveCart from "./IconRemoveCart";
import "./ShoppingCart.css";
export default function CartList() {
  const [showIcon, setShowIcon] = useState(false);
  const [topIcon, setTopIcon] = useState(null);
  const dispatch = useDispatch();

  const carts = useSelector((state) => {
    const notify = JSON.parse(localStorage.getItem("notification"));
    if (notify) {
      dispatch(createNotification(notify));
    }
    return state.carts;
  });
  const handleShowIcon = () => {
    setShowIcon(true);
  };
  const handleHideICon = () => {
    setShowIcon(false);
    setTopIcon(null);
  };
  const handleChangeTopIcon = useCallback(
    (cart) => setTopIcon((topIcon) => cart),
    []
  );
  const handleRemoveCart = (id) => {
    dispatch(removeCart(id));
    setShowIcon(false);
  };
  const handleClearAll = (e) => {
    const root = e.target.closest(".product-list__inner");
    if (root.querySelectorAll(".cart-list input:checked").length !== 0) {
      dispatch(removeAll());
    }
  };
  const handleCheckAll = (e) => {
    const root = e.target.closest(".product-list__inner");
    const parent = e.target.closest(".action-check");
    const checkboxList = root.querySelectorAll(
      '.cart-list input[type="checkbox"'
    );
    checkboxList.forEach((element) => {
      element.checked = e.target.checked;
    });
    parent.classList.toggle("action-checked");
  };
  return (
    <>
      <div className="product-list__wrapper">
        <div className="product-list__inner">
          <h1 className="shopping-bag__text">
            <span>Giỏ hàng của bạn</span>
          </h1>
          <div className="shopping-cart">
            <div
              className="cart-list"
              onMouseEnter={handleShowIcon}
              onMouseLeave={handleHideICon}
            >
              {carts.map((item, index) => (
                <Cart
                  mouseEnter={handleChangeTopIcon}
                  key={index}
                  cart={item}
                />
              ))}
              {showIcon && (
                <IconRemoveCart
                  removeCart={handleRemoveCart}
                  showIcon={showIcon}
                  cart={topIcon}
                />
              )}
            </div>
          </div>
          <div className="shopping-footer">
            <div className="actions-wrapper shopping-footer--item">
              <ul className="actions">
                <li className="action-item">
                  <label htmlFor="">Chọn tất cả : </label>
                  <div className={`action-check`}>
                    <input
                      type="checkbox"
                      id="checkAll"
                      onClick={handleCheckAll}
                    />
                  </div>
                </li>
                <li className="action-item">
                  <label htmlFor="">Xóa : </label>
                  <button onClick={handleClearAll} className="btn-clear-cart">
                    <i className="fas fa-trash"></i>
                  </button>
                </li>
              </ul>
            </div>
            <div className="total-money shopping-footer--item">
              <span className="total-money__text">
                Tổng cộng :
                <span className="money">
                  {carts.reduce(
                    (totalMoney, cart) => totalMoney + cart.price * cart.total,
                    0
                  )}
                  đ
                </span>
              </span>
              <button className="pay btn-primary">Thanh toán</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
