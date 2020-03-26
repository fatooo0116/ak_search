import React from 'react';

import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';

import TextField from '@material-ui/core/TextField';

import TopMenu from './TopMenu';

import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import Pagination from '@material-ui/lab/Pagination';

import '../scss/search_list.scss';



function SearchDetail() {
  return (
    <div className="search_app">
        <TopMenu />


        { /*  main data / left filter / right List */}
        <div className="search_detail">
          <div className="inner">
            

          </div> { /*  inner  */  }
        </div>
    </div>
  );
}

export default SearchDetail;
