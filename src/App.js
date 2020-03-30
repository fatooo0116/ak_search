import React from 'react';
import SearchDetail from './SearchDetail';
import SearchHome from './SearchHome';
import SearchListContainer from './SearchListContainer';
import './scss/compose.scss';


import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers/reducer'


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


let store = createStore(reducer);


function App() {
  return (
    <div id="app_seach">
      <Provider store = {store}>
          <Router>
            <Switch>
            <Route path="/" exact children={ <SearchHome /> } />        
            <Route path="/search/" children={ <SearchListContainer /> } />       
            <Route path="/detail/:id" children={ <SearchDetail /> } />       
            </Switch>
          </Router>    
        </Provider>  
    </div>
  );
}

export default App;
