import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "sass/index.scss";
import Home from "pages/Home/Home";
import Products from "pages/Products/Products";

const Root = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/products/:query" component={Products} />
      </Switch>
    </Router>
  );
};

export default Root;
