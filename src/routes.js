import React from "react";
import { Route, Switch } from "react-router-dom";
import Test from './components';

const Routes = () => (
  <Switch>
    <Route exact path="/test" component={Test} />
  </Switch>
);

export default Routes;
