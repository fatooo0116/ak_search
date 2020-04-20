import React from 'react';
import TopMenu from './components/TopMenu';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Modal from 'react-modal';
import LinearProgress from '@material-ui/core/LinearProgress';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import './scss/search_detail.scss';

const customStyles = {
  content : {
    top                   : '0%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, 100px)',
    maxWidth: '1024px',
    height: 'calc(90vh - 100px)'
  }
};



class  SearchDetail extends React.Component {
  constructor(props){
    super(props);
  }



  componentDidMount(){    
    this.props.initPageData(this.props.pid);
    // scroll.scrollToTop({duration:100});


    // window.addEventListener('scroll', this.props.handleScroll);
  }


  componentWillUnmount() {
     // window.removeEventListener('scroll', this.props.handleScroll);
  }



  render(){
    let me =this;
    const source = this.props.pageData._source;
   

                  let labels = [];                  
                  if(source){
                      source.related_element.forEach(function(item){

                      labels.push( 
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={(item  === me.props.maked)}
                                onChange={() => { (me.props.maked == item ) ? 
                                                    me.props.makedText('', source.labels,) : 
                                                    me.props.makedText(
                                                        item, 
                                                        source.labels                                                      
                                                        ) 
                                                      }} 
                                name="checkedB"
                                color="primary"
                              />
                            }
                            label={item}
                          />
                      );
                    });
                  }







    /* 事實 / 理由段標示 */
    const fact = (source)?
                  <div className="fact_modal">{source.paragraphs.fact.text.substring(0,100)}
                         <Button variant="outlined" color="primary" onClick={() =>{ this.props.detail_model_open(source.paragraphs.fact.text) }}>Read More</Button>
                  </div>
                  :
                  '';
    const reason = (source)?
                  <div className="fact_modal">{source.paragraphs.reason.text.substring(0,100)}
                          <Button variant="outlined" color="primary" onClick={() =>{ this.props.detail_model_open(source.paragraphs.fact.text) }}>Read More</Button>
                  </div>
                  :
                  '';                  


    /*  相關法條  */
    let rela_law = [];                  
    if(source){
        source.related_law.forEach(function(item){
          rela_law.push(<li>{item}</li>);
      });
    }
    

    /*  相似判決書連結  */
    let rela_doc = [];       
    let rela_icon = [];           
    if(this.props.pageData){
           
        this.props.pageData.related_doc.hits.hits.forEach(function(item){         
          rela_doc.push(<li><a href={'/detail/'+item._id}>{item._source.title}</a></li>);
          rela_icon.push(
                        <div className="prev_box" onClick={ () => { 
                                                                      me.props.detail_main_text(item._id,1) ;
                                                                    }}>
                          <img src="/doxxx.svg" />
                          <h4>{item._source.title}</h4>
                        </div>
                          );
      });
    }





/*
   var main_text  = ''; 
    
    if(Array.isArray(this.props.main_text)){
      
      let obj = [];      
      this.props.main_text.forEach(function(item,i){
        if(i==1){
          obj.push(<Element name="scroll-to-mk" className="element"><span id="mk"   >{item}</span></Element>);
        }else{
          obj.push(item);
        }        
      });

      // console.log(obj);
      main_text = [...obj];
    }else{
      main_text = this.props.main_text;
    }
*/



    /*  Marked Position */
    let tay = [];
    if(this.props.pos.length>0){
      console.log(this.props.pos);
      let source = [...this.props.main_text];
      
      let mypos = this.props.pos.sort(function (a, b) {
        return a.start - b.start //順序
      });

      let $of_start = 0;
      mypos.forEach(function(item,i){       

        tay.push(source.slice($of_start, item.start).join(''));        
        tay.push(<Element name={'scroll-to-mk'+i} className="element"><div id={'mk'+i}  className="mk" >{item.label_text}</div></Element>);
            
        
        if(i== (me.props.pos.length - 1)){
          tay.push(source.slice(item.end).join(''));
        }
        $of_start = item.end;  
      });

     
    }else{
      tay.push(me.props.main_text);
    }
   



    
    if(this.props.pos.length>0){
      setTimeout(function(){
        scroller.scrollTo('scroll-to-mk0', {
          duration: 100,
          delay: 0,
          smooth: 'easeInOutQuart',
          offset:-150
        })
      },200);
    }

    

    return (
      <div className="search_app"  >
          <TopMenu  path={this.props.path}  />
  
  

          { /*  main data / left filter / right List */}
          <div className="search_detail">
            <div className="toolbar">
              <div className="maker_item">
                <h4>要件標示</h4>
                <ul>
                  {labels}
                </ul>               
              </div>

              <div className="maker_item">
                <h4>事實 / 理由段標示</h4>
                {fact }
                <br/>
                {reason }
              </div>


              <div className="maker_item">
                <h4>相關法條</h4>
                <ol>
                  {rela_law}
                </ol>
              </div>              

              <div className="maker_item">
                <h4>相似判決書連結</h4>
                <ol>
                  {rela_doc}
                </ol>
              </div> 
            </div>
  


                
            <div className="main_article">            

            <Paper square  className={(me.props.page_offset > 80)? 'fixed':''}>
              <Tabs
                  value={this.props.relative_tab}
                  aria-label=""
              >
                <Tab label="本文" onClick={()=> this.props.tab_change(0) } />                
                <Tab label="相似判決書"  onClick={()=> this.props.tab_change(1) } />
              </Tabs>
            </Paper>

                  <div className="main_text">                   
                      <div className="xtabbox">
                        <div className={(this.props.relative_tab==0)? 'xtab active':'xtab' } > 
                            <h2 className="title">{(source)? source.title : ''}</h2>
                            <div className="date"><span>裁判日期 : </span>{(source)? source.time : ''}</div>
                            <div className="reason">
                              <span>裁判案由 : </span>{(source)? source.judge_reason : ''}
                            </div>
                            <div className="inner_main">{tay}</div>
                        </div>



                        <div className={(this.props.relative_tab==1)? 'xtab active':'xtab' } >
                          { (this.props.detail_page == 1) ? <Button color="primary"  className="backbtnx" onClick={() =>{  this.props.changeDetailPage(0) }} >< ArrowBackIcon /> BACK </Button> : '' }

                          { 
                            (this.props.detail_page == 0) ?  
                              <div className="all_rela_dox">{rela_icon}</div> : 
                              <div className="miniPage">
                                  <h2 className="title">{ (this.props.mini_detail_title)? this.props.mini_detail_title : <div style={{width:'30%',margin:'auto'}}><LinearProgress color="primary" /></div> }</h2>
                                  <div className="reason">{ this.props.mini_detail_time}</div>
                                  <div className="reason">{this.props.mini_detail_reason}</div>
                                  <div className="main_text">{this.props.mini_detail_text}</div>
                              </div> 
                            }

                        </div>
                      </div>
                  </div>
  
            </div> { /*  inner  */  }
          </div>

          <Backdrop    open={this.props.detail_loading_status} >
            <CircularProgress  />
          </Backdrop>

          <Modal
          isOpen={this.props.modal_open}
          // onAfterOpen={af}
          shouldCloseOnOverlayClick={true}
           onRequestClose={() => { this.props.detail_model_close() }}
          style={customStyles}
          contentLabel="Example Modal"
              >{this.props.model_text}</Modal>

      </div>
    );
  }

}

export default SearchDetail;
