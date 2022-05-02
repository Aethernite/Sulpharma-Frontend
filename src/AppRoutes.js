import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./components/HomePage.js";
import ProductPage from "./components/ProductPage/ProductPage.js";
import { MapPage } from "./components/index.js";

const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route
        path="/products/search/:query"
        exact
        component={ProductPage}
      />
      <Route
        path="/products/:category/:subcategory"
        exact
        component={ProductPage}
      />
      <Route path="/products/:category" exact component={ProductPage} />
      <Route path="/locations" exact component={MapPage} />
      <Redirect to="/" />
    </Switch>
  );
};

export default AppRoutes;
