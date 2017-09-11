import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import DefaultView from './components/DefaultView';
import CategoryView from './components/CategoryView';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">

<Switch>
      <Route
          exact
          path="/"
          render={() =>
            <DefaultView             
            />}
        />

      <Route
          exact
          path="/category/:name"
          render={() =>
            <CategoryView             
            />}
        />
</Switch>

      </div>
    );
  }
}

export default App;
