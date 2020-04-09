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
    let me = this;
    
    let tpl = [];
    let state_law = [];
    let state_element = [];

    var xpagination = '';

    if(this.props.listData.hasOwnProperty('hits')){
      /*
      this.props.listData.htis.hits.forEach(function(item){
        tpl.push();
      });
      */
      this.props.listData.hits.hits.forEach(function(item){
        tpl.push(<article key={item._id} className="single-event">
                    <h3><Link to={"/detail/"+item._id}>{item._source.title}</Link></h3>
                    <div className="time">{item._source.time}</div>
                    <div className="excerpt"
                        dangerouslySetInnerHTML={{
                          __html: item.highlight.text
                        }}></div>
                  </article>);
      });
      this.props.listData.aggregations.count_stats_law.buckets.forEach(function(item,i){
        if(i<5){
          state_law.push(
            <ListItem button>
                          <ListItemText primary={item.key} />
                        </ListItem>
          );
        }
      });
      this.props.listData.aggregations.count_stats_element.buckets.forEach(function(item,i){
        if(i<5){
          state_element.push(
            <ListItem button>
                          <ListItemText primary={item.key} />
                        </ListItem>
          );
        }
      });

      
      let allpage =  Math.ceil(this.props.listData.hits.total.value/10);
      let  pageValue = (this.props.pageValue) ? this.props.pageValue:1;
       console.log(pageValue);
       xpagination  = <Pagination count={allpage}  page={pageValue}  variant="outlined" shape="rounded" onChange={(page ,value)=> me.props.changePage(value,me.props.keyinput,me.props.selectValue) }  /> ;

     }

   
     

     /*
     this.props.listData.aggregations.count_stats_element.buckets.forEach(function(item){
      console.log(item);
     });
     */


   

    return (
      <div className="search_app">
        <TopMenu />
  
  
          { /*  main data / left filter / right List */}
          <div className="main">
            <div className="inner clearfix">
              <div className="main_list">     
                  {tpl}                                          
              </div>
              <div className="filter">
                  <Card >
                    <CardContent>
                      {state_law}            
                    </CardContent>
                  </Card>


                  <Card >
                    <CardContent>
                      {state_element}              
                    </CardContent>
                  </Card>

              </div> { /*  filter  */  }
  
            </div> { /*  inner  */  }

          { xpagination }
            
          </div>
      </div>
    );
  }
}

export default SearchList;
