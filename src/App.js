import React, { Component } from 'react';
import { Route } from "react-router-dom";
import DefaultView from './components/DefaultView';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Route
          exact
          path="/"
          render={() =>
            <DefaultView             
            />}
        />

      </div>
    );
  }
}

export default App;
