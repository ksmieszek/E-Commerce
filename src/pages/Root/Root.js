import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "sass/index.scss";
import Home from "pages/Home/Home";

const Root = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default Root;
