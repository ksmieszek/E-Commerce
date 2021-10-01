import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "sass/index.scss";
import Home from "pages/Home/Home";
import Products from "pages/Products/Products";
import OverlayProvider from "providers/OverlayProvider";
import ComponentPresenceProvider from "providers/ComponentPresenceProvider";
import MainTemplate from "templates/MainTemplate";

const Root = () => {
  return (
    <OverlayProvider>
      <ComponentPresenceProvider>
        <Router>
          <MainTemplate>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/products/:query" component={Products} />
            </Switch>
          </MainTemplate>
        </Router>
      </ComponentPresenceProvider>
    </OverlayProvider>
  );
};

export default Root;
