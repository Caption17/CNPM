import classNames from "classnames";
import React from "react";
export default function IconRemoveCart({ cart, showIcon, removeCart }) {
  let _style = null;
  if (cart) {
    _style = {
      top: `${cart.top + 50 - 5}px`,
    };
  }
  const handleRemoveCart = () => {
    removeCart(cart.id);
  };
  return (
    <>
      <div
        style={_style}
        className={classNames("cart-icon--remove", {
          show: showIcon,
        })}
      >
        <i className="fas fa-times" onClick={handleRemoveCart}></i>
      </div>
      <svg
        id="filter-svg"
        xmlns="http://www.w3.org/2000/svg"
        version="
                1.1"
      >
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </svg>
    </>
  );
}
