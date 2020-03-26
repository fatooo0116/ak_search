import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import  axios from 'axios';
import '../scss/top_menu.scss';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

import  SearchBox from './SearchBox';


class TopMenu extends React.Component {

    render(){
        return(
            <div class="header">
            <div className="logo"><img src="https://static.wixstatic.com/media/785e04_a7d4686fbce34cf190a4635ea4730975~mv2.png/v1/crop/x_116,y_320,w_788,h_187/fill/w_464,h_110,al_c,q_85,usm_0.66_1.00_0.01/web%20logo_001.webp" /></div>
            <div className="search">
                <SearchBox />
            </div>
          </div>
        )
    }
}


export default TopMenu;