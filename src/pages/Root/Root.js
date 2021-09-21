import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "sass/index.scss";
import Navigation from "components/navigation/Navigation";

const Root = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Navigation />
        </Route>
      </Switch>
    </Router>
  );
};

export default Root;
