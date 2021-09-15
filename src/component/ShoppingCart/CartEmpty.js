import React from "react";
import "./CartEmpty.css";
import "../../common/Button.css";
import { Link } from "react-router-dom";
export default function CartEmpty() {
  return (
    <>
      <div className="cart-empty">
        <img
          className="cart-empty-img"
          src="https://salt.tikicdn.com/desktop/img/mascot@2x.png"
          alt="giỏ hàng trống"
        />
        <p className="cart-message">
          Không có sản phẩm nào trong giỏ hàng của bạn.
        </p>
        <Link to="/">
          <button className="btn btn-primary btn-cart-empty">
            Tiêp tục mua sắm
          </button>
        </Link>
      </div>
    </>
  );
}
