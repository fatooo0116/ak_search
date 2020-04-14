import React from 'react';

import TopMenu from './components/TopMenu';


import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import Modal from 'react-modal';

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
    this.state = {
      option:'female'
    }
    this.handleChange = this.handleChange.bind(this);
    
  }


  handleChange(e){
    this.setState({
      option:e.target.value
    });
  }




  componentDidMount(){    
    this.props.initPageData(this.props.pid);
    scroll.scrollToTop({duration:100});
  }



 


  render(){
    let me =this;
    const source = this.props.pageData._source;
    console.log(me.props.maked);
    


    const maker_type = (source)?
                  <span className="mark_type">{(source.data_type=='manual')? '人工' : '自動' }</span>
                  :
                  '';

                  let labels = [];                  
                  if(source){
                      source.labels.forEach(function(item,i){

                       let obj = {
                          mid:i, 
                          ...item                         
                       } 

                     //  console.log(obj);

                      labels.push( 
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={(i == me.props.maked.mid)}
                                onChange={() => { ( me.props.maked.mid == obj.mid)? 
                                                    me.props.makedText('', '', me.props.pageData._source.text) : 
                                                    me.props.makedText(obj,me.props.main_text, me.props.pageData._source.text) }}
                                name="checkedB"
                                color="primary"
                              />
                            }
                            label={item.label}
                          />
                      );
                    });
                  }



    let rela_element = [];                  
    if(source){
        source.related_element.forEach(function(item){
          rela_element.push(<li>{item}</li>);
      });
    }


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



    let rela_law = [];                  
    if(source){
        source.related_law.forEach(function(item){
          rela_law.push(<li>{item}</li>);
      });
    }
    


    let rela_doc = [];                  
    if(this.props.pageData){
       
      console.log(this.props.pageData);

        this.props.pageData.related_doc.hits.hits.forEach(function(item){         
          rela_doc.push(<li><a href={'/detail/'+item._id}>{item._source.title}</a></li>);
      });
    }


   var main_text  = ''; 
    
    if(Array.isArray(this.props.main_text)){

      console.log(this.props.main_text);

      let obj = [];      
      this.props.main_text.forEach(function(item,i){
        if(i==1){
          obj.push(<Element name="scroll-to-mk" className="element"><span id="mk"   >{item}</span></Element>);
        }else{
          obj.push(item);
        }        
      })

      console.log(obj);
      main_text = [...obj];
    }else{
      main_text = this.props.main_text;
    }
    

    setTimeout(function(){
      scroller.scrollTo('scroll-to-mk', {
        duration: 300,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset:-150
      })
    },100);

    

    return (
      <div className="search_app"  >
          <TopMenu  path={this.props.path}  />
  
  
          { /*  main data / left filter / right List */}
          <div className="search_detail">
  
            <div className="toolbar">

              <div className="maker_item">
                <h4>標記方式  {maker_type }</h4>                
              </div>

              <div className="maker_item">
                <h4>要件標示</h4>
                <ul>
                  {labels}
                </ul>               
                <ol>
                {
                  rela_element
                }
                </ol>
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
                  <h2 className="title">{(source)? source.title : ''}</h2>
                  <div className="date"><span>裁判日期 : </span>{(source)? source.time : ''}</div>
                  <div className="reason">
                  <span>裁判案由 : </span>{(source)? source.judge_reason : ''}
                  </div>
                  <div className="main_text">
                    {main_text}
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
