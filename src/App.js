import React from 'react';
import SearchDetailContainer from './SearchDetailContainer';
import SearchHomeContainer from './SearchHomeContainer';
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


let lastScrollY = 0;
let ticking = false;

let store = createStore(reducer);


const Child = ({ match }) => (
  <div>   
    <SearchDetailContainer pid={match.params.id}  path={match} />
  </div>
)

const ChildSearch = ({ match })=>(
  <SearchListContainer pid={match.params.id}  path={match} />
)



class App extends React.Component {



  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (event) => {
     lastScrollY = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
      //  console.log(lastScrollY);
        ticking = false;
      });
    }
   
      ticking = true;
  }


  render(){
    return (
      <div id="app_seach">
        <Provider store = {store}>
            <Router>
              <Switch>
              <Route path="/" exact children={ <SearchHomeContainer /> } /> 
              <Route path="/search/:id" children={ ChildSearch  } />    
              <Route path="/search/" children={ <SearchListContainer /> } />          
                 
              <Route path="/detail/:id" children={Child} />       
              </Switch>
            </Router>    
          </Provider>  
      </div>
    );
  }

}

export default App;
