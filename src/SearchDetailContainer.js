
import { connect } from 'react-redux'
import {initPageData,pageDetailMark,detail_load_begin,detail_load_end,detail_model_open,detail_model_close} from './actions/action.js';

import axios from 'axios';
import SearchDetail from './SearchDetail';








const mapStateToProps = (state) => {  
 
  return {
    pageData : state.pageInit.data,        
    maked: state.pageInit.maked,
    main_text: state.pageInit.main_text,     
    detail_loading_status:state.changeInput.detail_loading_status,
    modal_open: state.pageInit.modal_open, 
    model_text: state.pageInit.model_text, 
  }
}



const mapDispatchToProps = (dispatch) => {
    return {

      initPageData:(pid) => {

        dispatch(detail_load_begin());

        let me = this;
        axios.post('http://127.0.0.1:3000/api/getPageById',{
          key:pid,
        }).then(function(res){
    
          console.log(res.data);
          dispatch(initPageData(res.data));
          dispatch(detail_load_end());

        }).catch(function (error) {
          console.log(error);
        });        
      },    
      

      makedText:(labelObj,fixMainText, originalText) => {

         console.log(originalText);
      
       // dispatch(pageDetailMark(labelObj));
      //  console.log(fixMainText);

       if(labelObj){

         let source = [...originalText];

         let tay = [];
         tay.push(source.slice(0, labelObj.start).join(''));
        // tay.push(labelObj.label_text);
         tay.push(source.slice(labelObj.start,labelObj.end).join(''));
         tay.push(source.slice(labelObj.end).join(''));

        // console.log(tay);

         dispatch(pageDetailMark(labelObj,tay));
       }else{

        dispatch(pageDetailMark(labelObj,originalText));
       }    
      },
      
      
      detail_model_open:(text) =>{        
        dispatch(detail_model_open(text));
      },
      
      detail_model_close:() => {
        dispatch(detail_model_close());
      }
      
      

    }
}






export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchDetail);