import React from 'react';
import { Route } from 'react-router-dom';

import '../scss/top_menu.scss';


import  SearchBoxContainer from './SearchBoxContainer';




class TopMenu extends React.Component {

    render(){
        return(
            <div className="header">
            <Route render={({ history}) => (
                <a href="/"   className="logo" ><img src="/xlogo.png" /></a>
            )} />    
            <div className="search">
                <SearchBoxContainer  path={this.props.path} />
            </div>
          </div>
        )
    }
}


export default TopMenu;