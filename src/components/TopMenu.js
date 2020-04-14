import React from 'react';
import { Route } from 'react-router-dom';

import '../scss/top_menu.scss';


import  SearchBoxContainer from './SearchBoxContainer';




class TopMenu extends React.Component {

    render(){
        return(
            <div className="header">
            <Route render={({ history}) => (
                <a href="/"   className="logo" ><img src="https://static.wixstatic.com/media/785e04_a7d4686fbce34cf190a4635ea4730975~mv2.png/v1/crop/x_116,y_320,w_788,h_187/fill/w_464,h_110,al_c,q_85,usm_0.66_1.00_0.01/web%20logo_001.webp" /></a>
            )} />    
            <div className="search">
                <SearchBoxContainer  path={this.props.path} />
            </div>
          </div>
        )
    }
}


export default TopMenu;