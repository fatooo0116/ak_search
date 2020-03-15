import React from 'react';
import SearchDetail from './components/SearchDetail';
import SearchHome from './components/SearchHome';
import './scss/compose.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Prompt
} from "react-router-dom";


function App() {
  return (
    <div id="app_seach">
     

    <Router>
      <Switch>
        <Route path="/" exact children={ <SearchHome /> } />
        <Route path="/search" children={ <SearchDetail /> } />       
      </Switch>
      </Router>      
    </div>
  );
}

export default App;
