import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "sass/index.scss";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "store";
import Home from "pages/Home/Home";
import Products from "pages/Products/Products";
import NotFound from "pages/404/NotFound";
import Product from "pages/Product/Product";
import OverlayProvider from "hooks/useOverlay";
import ComponentPresenceProvider from "hooks/useComponentPresence";
import MainTemplate from "templates/mainTemplate/MainTemplate";

const Root = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <OverlayProvider>
          <ComponentPresenceProvider>
            <Router>
              <MainTemplate>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/products/:query" component={Products} />
                  <Route path="/product/:id" component={Product} />
                  <Route component={NotFound} />
                </Switch>
              </MainTemplate>
            </Router>
          </ComponentPresenceProvider>
        </OverlayProvider>
      </PersistGate>
    </Provider>
  );
};

export default Root;
