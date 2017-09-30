import React, { Component } from 'react';
import { Route, Switch, Link} from "react-router-dom";
import DefaultView from './components/DefaultView';
import CategoryView from './components/CategoryView';
import PostDetailsView from './components/PostDetailsView';
import CreateOrEditView from './components/CreateOrEditView';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Link to={`/`}><b>Home</b></Link><br />

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
          path="/:category"
          render={props=> (
                  <CategoryView {...props}/>
          )}
        />

      <Route
          exact
          path="/:category/:id"
          render={props=> (
                  <PostDetailsView {...props}/>
          )}
        />       

     <Route
      exact
      path="/create/:type"
      render={props=> (
              <CreateOrEditView {...props} mode='create'/>
      )}
    />  

     <Route
      exact
      path="/create/:type/:id"
      render={props=> (
              <CreateOrEditView {...props} mode='create'/>
      )}
    />  

     <Route
      exact
      path="/edit/:type/:id"
      render={props=> (
              <CreateOrEditView {...props} mode='edit'/>
      )}
    />    
  
</Switch>

      </div>
    );
  }
}

export default App;
