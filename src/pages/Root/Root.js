import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "sass/index.scss";

const Root = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div>eccomerce</div>
        </Route>
      </Switch>
    </Router>
  );
};

export default Root;
