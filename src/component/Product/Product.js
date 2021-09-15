import React, { useEffect, useRef, useState } from "react";
import "./Product.css";
import "../../common/Button.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCarts } from "../../actions/Cart";
import { createNotification } from "../../actions/Notification";

export default function Product({ product }) {
  const [productNumber, setProductNumber] = useState(() => 1);
  const dispatch = useDispatch();
  const cart = useSelector((state) => {
    const notify = JSON.parse(localStorage.getItem("notification"));
    if (notify && notify.id === product.id) {
      dispatch(createNotification(notify));
    }
    return state.carts[product.id];
  });
  const inputElm = useRef(null);
  useEffect(() => {
    inputElm.current.value = productNumber;
  }, [productNumber]);
  const handleClickProductNumber = (operator) => {
    let val = productNumber;
    switch (operator) {
      case "+":
        if (productNumber < product.total) {
          val++;
        }
        break;
      case "-":
        if (productNumber > 1) {
          val--;
        }
        break;
    }
    setProductNumber(val);
  };

  const isNumber = (event) => {
    const regex = /[0-9A-F:]+/g;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleAddtoCart = () => {
    if (inputElm.current.value !== "") {
      const val = parseInt(inputElm.current.value);
      const cartNew = {
        ...product,
        total: val,
      };
      dispatch(addToCarts(cartNew));
    }
  };

  return (
    <>
      <div className="product">
        <div className="product-media">
          <img src={product.avatar} alt="" className="product-avatar" />
        </div>
        <div className="product-description">
          <h3 className="product-name">{product.name}</h3>
          <div className="product-price__wrapper">
            <span className="product-price">{product.price}đ</span>
            <div className="cart-total">
              <button
                className="btn-cart__reduction"
                onClick={() => handleClickProductNumber("-")}
              >
                <i className="fas fa-minus"></i>
              </button>
              <input
                onKeyPress={isNumber}
                ref={inputElm}
                className="cart-total__value"
                defaultValue="1"
                type="text"
              />
              <button
                className="btn-cart__increase"
                onClick={() => handleClickProductNumber("+")}
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
          <button
            style={{ with: "100%" }}
            className="add-to-cart btn btn-primary"
            onClick={handleAddtoCart}
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </>
  );
}
