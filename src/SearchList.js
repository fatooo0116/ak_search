import React from 'react';

import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';

import CircularProgress from '@material-ui/core/CircularProgress';

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

  

  componentDidMount(pid){    

    this.props.initPageList(this.props.pid, this.props.selectValue);
  }


  render(){
    let me = this;
    
    let tpl = [];
    let state_law = [];
    let state_element = [];

    var xpagination = '';


    if(this.props.listData.hasOwnProperty('hits')){


     console.log('render');


     

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
            <ListItem key={item.key}  button onClick={() => me.props.advanceSearch(item.key,me.props.keyinput,me.props.selectValue)} >
                <ListItemText primary={item.key} />
            </ListItem>
          );
        }
      });
      this.props.listData.aggregations.count_stats_element.buckets.forEach(function(item,i){
        if(i<5){
          state_element.push(
              <ListItem key={item.key}  button onClick={() => me.props.advanceSearch(item.key,me.props.keyinput,me.props.selectValue) } >
                          <ListItemText primary={item.key} />
               </ListItem>
          );
        }
      });

      
      let allpage =  Math.ceil(this.props.listData.hits.total.value/10);
      let  pageValue = (this.props.pageValue) ? this.props.pageValue:1;
       console.log(pageValue);
       xpagination  = <Pagination count={allpage}  page={pageValue}  variant="outlined" shape="rounded" onChange={(page ,value)=> me.props.changePage(value, me.props.keyinput, me.props.selectValue, me.props.ad_text) }  /> ;

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
                  {(tpl.length>0)? tpl : <CircularProgress />}                                          
              </div>
              <div className="filter">

                  
                  { (state_element.length > 0 ) ?  <Card ><CardContent><h3>相關要件</h3>{state_element}</CardContent></Card> : '' }
                  { (state_law.length > 0 ) ?  <Card ><CardContent><h3>相關法條</h3>{state_law}</CardContent></Card> : '' }

                  

              </div> { /*  filter  */  }
  
            </div> { /*  inner  */  }

          { xpagination }
            
          </div>
      </div>
    );
  }
}

export default SearchList;
