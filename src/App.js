import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from "./component/Footer/Footer";
import Header from "./component/Header/Header";
import NotificationProvider from "./component/Notification/NotificationProvider";
import ProductList from "./component/Product/ProductList";
import ShoppingCart from "./component/ShoppingCart/ShoppingCart";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={ProductList} />
          <Route path="/shopping-cart" exact component={ShoppingCart} />
        </Switch>
        <Footer />
        <NotificationProvider />
      </BrowserRouter>
    </>
  );
}

export default App;
