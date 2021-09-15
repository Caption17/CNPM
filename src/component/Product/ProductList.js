import React from "react";
import { useSelector } from "react-redux";
import Product from "./Product";
import "./Product.css";
export default function ProductList() {
  const products = useSelector((state) => {
    return state.products;
  });
  return (
    <>
      <div className="product-list__wrapper">
        <div className="product-list__inner">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
