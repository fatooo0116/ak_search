import React from 'react';

import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';


// import InboxIcon from '@material-ui/icons/Inbox';
// import DraftsIcon from '@material-ui/icons/Drafts';

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

import CardContent from '@material-ui/core/CardContent';
import Pagination from '@material-ui/lab/Pagination';
import TopMenu from './components/TopMenu';
import './scss/search_list.scss';


import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import Chip from '@material-ui/core/Chip';



import {
  Link
} from "react-router-dom";

import {  DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'







class SearchList extends React.Component{
  constructor(props){
    super(props);
  }

  

  componentDidMount(){    
    console.log(this.props.path);
    this.props.initPageList(this.props.pid, this.props.selectValue);
  }


  render(){
    let me = this;
    
    let tpl = [];
    let state_law = [];
    let state_element = [];
    var xpagination = '';
    let listTotal = '';
    let tooksec = '';

    if(this.props.listData.hasOwnProperty('hits')){
     

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




      this.props.listData.aggregations.count_stats_element.buckets.forEach(function(item,i){
      
          
           /*  remove the tagged key */
           if(!me.props.ad_element_text.includes(item.key)){
            state_element.push(                        
              <ListItem key={item.key}  button onClick={() => me.props.advanceElementSearch(
                                                                              item.key,
                                                                              me.props.ad_element_text,
                                                                              me.props.keyinput,
                                                                              me.props.selectValue
                                                                              )} >
                  <ListItemText primary={item.key} />
              </ListItem>
            );
           }
        
        
      });


      

      this.props.listData.aggregations.count_stats_law.buckets.forEach(function(item,i){

       
          if(!me.props.ad_law_text.includes(item.key)){
            state_law.push(
                <ListItem key={item.key}  button onClick={() => me.props.advanceLawSearch(
                                                                                item.key,
                                                                                me.props.ad_law_text,
                                                                                me.props.keyinput,
                                                                                me.props.selectValue
                                                                                ) } >
                            <ListItemText primary={item.key+" ("+item.doc_count+")"} />
                </ListItem>
            );
          }
        
      });



      
      let allpage =  Math.ceil(this.props.listData.hits.total.value/10);
      let  pageValue = (this.props.pageValue) ? this.props.pageValue:1;

       
       xpagination  = (allpage)? <Pagination count={allpage}  page={pageValue}  variant="outlined" shape="rounded" onChange={(page ,value)=> {  me.props.changePage(value, me.props.keyinput, me.props.selectValue, me.props.ad_element_text ,me.props.ad_law_text);} }  /> :'' ;
       listTotal = me.props.listData.hits.total.value;
       tooksec = me.props.listData.took/1000;
     }

   
     

     /*
     this.props.listData.aggregations.count_stats_element.buckets.forEach(function(item){
      console.log(item);
     });
     */

 




    let ad_elements = [];
    this.props.ad_element_text.forEach(function(item){
      ad_elements.push(<Chip label={item} onDelete={() =>{ me.props.removeAdElement(item, me.props.ad_element_text, me.props.keyinput, me.props.selectValue); }} color="primary" />);
    });

    let ad_laws = [];
    this.props.ad_law_text.forEach(function(item){
      ad_laws.push(<Chip label={item} onDelete={() =>{  me.props.removeAdLaw(item, me.props.ad_law_text, me.props.keyinput,me.props.selectValue); }} color="primary" />);
    });


   
    setTimeout(function(){
      scroll.scrollToTop({duration:100});
    },100);


   

    return (
      <div className="search_app">
        <TopMenu  path={this.props.path}   />
  
  
          { /*  main data / left filter / right List */}
          <div className="main">
            <div className="inner clearfix">
              <div className="main_list">     
                  {(tpl.length>0)? tpl : ''}  
                  <div className="small_total">{(listTotal)? "搜尋結果 "+listTotal+" 筆" : "" } - 花費 {tooksec} 秒</div> 
                  { xpagination }                                       
              </div>
              <div className="filter">
                 
                  { (ad_elements.length > 0 ) ?  
                      <div className="tags law1">{ ad_elements }</div> : ''  }   
                              
                  { (state_element.length > 0 ) ?  <Card className="fx1" ><CardContent><h3>相關要件</h3><div className="ibox">{state_element}</div> <Button variant="outlined" size="small" color="primary">READ MORE</Button> </CardContent></Card> : '' }


                  { (ad_laws.length > 0 ) ?  
                      <div className="tags law2">{ ad_laws }</div> : ''  }   

                  { (state_law.length > 0 ) ?  <Card className="fx2" ><CardContent><h3>相關法條</h3><div className="ibox">{state_law} </div> <Button variant="outlined" size="small" color="primary">READ MORE</Button> </CardContent></Card> : '' }
                  
              </div> { /*  filter  */  }
            </div> { /*  inner  */  }

            
          

        
          <Backdrop    open={this.props.loading_status} >
            <CircularProgress  />
          </Backdrop>
          </div>
      </div>
    );
  }
}

export default SearchList;
