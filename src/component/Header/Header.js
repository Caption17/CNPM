import classNames from "classnames";
import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import "./Header.css";
export default function Header() {
  const cartTotal = useSelector((state) => {
    if (state.carts.length === 0) {
      return 0;
    }
    return state.carts.reduce((acc, current) => (acc += current.total), 0);
  });
  return (
    <>
      <div className="header-container">
        <div className="header-inner">
          <h1 className="header-title">SHOPPING NOW</h1>
          <div className="header-intro">
            <ul className="intor-list">
              <LinkCustom to="/" label="Home" activeOnlyWhenExact={true} />
              <LinkCustom
                to="/shopping-cart"
                activeOnlyWhenExact={true}
                elmAfter={
                  <>
                    <span>
                      Giỏ hàng <i className="fas fa-shopping-cart"></i>
                    </span>
                    {cartTotal !== 0 && (
                      <span className="cart-number">{cartTotal}</span>
                    )}
                  </>
                }
              />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

const LinkCustom = ({ to, label = "", activeOnlyWhenExact, elmAfter }) => {
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match }) => {
        return (
          <li className={classNames("intro-item", { "link-active": match })}>
            <Link to={to} className="link">
              {label}
              {elmAfter && elmAfter}
            </Link>
          </li>
        );
      }}
    />
  );
};
