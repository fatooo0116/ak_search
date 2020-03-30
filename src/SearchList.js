import React from 'react';

import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';

import TextField from '@material-ui/core/TextField';

// import InboxIcon from '@material-ui/icons/Inbox';
// import DraftsIcon from '@material-ui/icons/Drafts';

import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import Pagination from '@material-ui/lab/Pagination';
import TopMenu from './components/TopMenu';

import './scss/search_list.scss';

import {
  Link
} from "react-router-dom";


class SearchList extends React.Component{
  constructor(props){
    super(props);
  }

  



  render(){

    console.log(this.props.listData);
    let tpl = [];
    if(this.props.listData.hasOwnProperty('hits')){
      /*
      this.props.listData.htis.hits.forEach(function(item){
        tpl.push();
      });
      */
      this.props.listData.hits.hits.forEach(function(item){
        tpl.push(<article key={item._id} className="single-event">
                    <h3><Link to={"/detail/"+item._id}>{item._source.title}</Link></h3>
                  </article>);
      });
     }
    

    return (
      <div className="search_app">
        <TopMenu />
  
  
          { /*  main data / left filter / right List */}
          <div className="main">
            <div className="inner">
              <div className="main_list">     
                  {tpl}
                  <article className="single-event">                 
                    <h3><Link to="/detail/112">this is title</Link></h3>
                    <div className="excerpt">
                    FILING DATE FIRST NAMED INVENTOR ATTORNEY DOCKET NO. CONFIRMATION NO. 13/022,809 02/08/2011 Robert F. Hurt M190.249.103 7432 63496 7590 01/31/2017 DICKE, BILLIG & CZAJA, PLLC ATTN: MDT SURGICAL TECHNOLOGIES
                    <br/>
                    UNITED STATES PATENT AND TRADEMARK OFFICE BEFORE THE PATENT TRIAL AND APPEAL BOARD Ex parte ROBERT F. HURT Appeal 2015-004011 Application 13/022,809 Technology Center 3700 Before JENNIFER D. BAHR, LINDA
                    </div>
                  </article>
  
  
                                          
              </div>
              <div className="filter">
                  <Card >
                    <CardContent>
                      <ListItem button>
                        <ListItemText primary="I法條第103迢遞款" />
                      </ListItem>
                      <ListItem button>
                        <ListItemText primary="I法條第103迢法條第103迢遞遞款第三項" />
                      </ListItem>                
                    </CardContent>
                  </Card>
              </div> { /*  filter  */  }
  
            </div> { /*  inner  */  }
          </div>
      </div>
    );
  }
}

export default SearchList;
