import React from "react";
import CartEmpty from "./CartEmpty";
import { useSelector } from "react-redux";
import "./ShoppingCart.css";
import CartList from "./CartList";

export default function ShoppingCart() {
  const length = useSelector((state) => state.carts.length);
  console.log(length);
  return (
    <>
      <div className="shopping-bag__wrapper">
        {length === 0 ? <CartEmpty /> : <CartList />}
      </div>
    </>
  );
}
