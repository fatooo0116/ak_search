
import { connect } from 'react-redux'
import {
        initPageData,
        pageDetailMark,
        detail_load_begin,
        detail_load_end,
        detail_model_open,
        detail_model_close,
        tab_change,
        changeDetailPage,
        showMiniDetailPage,
        changeWindowScroll
      } from './actions/action.js';

import axios from 'axios';
import SearchDetail from './SearchDetail';








const mapStateToProps = (state) => {  
 
  return {
    pageData : state.pageInit.data,        
    maked: state.pageInit.maked,
    pos: state.pageInit.pos,
    main_text: state.pageInit.main_text,     
    detail_loading_status:state.changeInput.detail_loading_status,
    modal_open: state.pageInit.modal_open, 
    model_text: state.pageInit.model_text, 
    relative_tab:state.pageInit.relative_tab,
    detail_page: state.pageInit.detail_page,
    mini_detail_title: state.pageInit.mini_detail_title,
    mini_detail_time: state.pageInit.mini_detail_time,
    mini_detail_reason: state.pageInit.mini_detail_reason,
    mini_detail_text: state.pageInit.mini_detail_text,   
    page_offset:state.pageInit. page_offset 
  }
}



const mapDispatchToProps = (dispatch) => {
    return {

      initPageData:(pid) => {

        dispatch(detail_load_begin());

        let me = this;
        axios.post('/api/getPageById',{
          key:pid,
        }).then(function(res){
    
          console.log(res.data);
          dispatch(initPageData(res.data));
          dispatch(detail_load_end());

        }).catch(function (error) {
          console.log(error);
        });        
      },    
      

      makedText:(label, all_labels) => {

          //  console.log(all_labels);
          let ownPos = all_labels.filter(item => item.label == label); 
           
           console.log(label);

          if(label){ /* checked value   */                      
            dispatch(pageDetailMark(label,ownPos));            
          }else{  /*  release checkbox  */                       
            dispatch(pageDetailMark('',[]));
          }
      },
      
      
      detail_model_open:(text) =>{        
        dispatch(detail_model_open(text));
      },
      
      detail_model_close:() => {
        dispatch(detail_model_close());
      },
      
      tab_change:(page) =>{
        dispatch(tab_change(page));
      },

      detail_main_text:(detail_key,detail_page) =>{
        console.log(detail_key);
        console.log(detail_page);
        dispatch(changeDetailPage(1));

          axios.post('/api/getPageById',{
            key:detail_key,
          }).then(function(res){
      
           //  console.log(res.data);
           //  dispatch(initPageData(res.data));
           //  dispatch(detail_load_end());
           console.log(res.data);
           dispatch(showMiniDetailPage(res.data._source));

          }).catch(function (error) {
            console.log(error);
          });        
        },          

      changeDetailPage:(status) => {
        dispatch(changeDetailPage(0));
      },


   
      handleScroll:(event) =>{
      
        let offset = (window.pageYOffset > 50 )? (window.pageYOffset - 50) : 0;

         dispatch(changeWindowScroll(offset));
      }

    }
}






export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchDetail);