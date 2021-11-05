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
import Order from "pages/Order/Order";
import Orders from "pages/Orders/Orders";
import PreviousOrder from "pages/PreviousOrder/PreviousOrder";
import OverlayProvider from "hooks/useOverlay";
import ComponentPresenceProvider from "hooks/useComponentPresence";
import CartProvider from "hooks/useCart";
import AuthProvider from "hooks/useAuth";
import MainTemplate from "templates/mainTemplate/MainTemplate";

const Root = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <CartProvider>
            <OverlayProvider>
              <ComponentPresenceProvider>
                <Router>
                  <MainTemplate>
                    <Switch>
                      <Route exact path="/" component={Home} />
                      <Route path="/products/:query" component={Products} />
                      <Route path="/product/:id" component={Product} />
                      <Route path="/orders" component={Orders} />
                      <Route exact path="/order" component={Order} />
                      <Route path="/order/:id" component={PreviousOrder} />
                      <Route component={NotFound} />
                    </Switch>
                  </MainTemplate>
                </Router>
              </ComponentPresenceProvider>
            </OverlayProvider>
          </CartProvider>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
};

export default Root;
