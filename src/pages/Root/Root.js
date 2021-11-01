import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "sass/index.scss";
import Home from "pages/Home/Home";
import Products from "pages/Products/Products";
import NotFound from "pages/404/NotFound";
import OverlayProvider from "hooks/useOverlay";
import ComponentPresenceProvider from "hooks/useComponentPresence";
import MainTemplate from "templates/mainTemplate/MainTemplate";

const Root = () => {
  return (
    <OverlayProvider>
      <ComponentPresenceProvider>
        <Router>
          <MainTemplate>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/products/:query" component={Products} />
              <Route component={NotFound} />
            </Switch>
          </MainTemplate>
        </Router>
      </ComponentPresenceProvider>
    </OverlayProvider>
  );
};

export default Root;
