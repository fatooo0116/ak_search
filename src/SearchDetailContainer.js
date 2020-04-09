
import { connect } from 'react-redux'
import {initPageData} from './actions/action.js';

import axios from 'axios';
import SearchDetail from './SearchDetail';








const mapStateToProps = (state) => {  
 
  return {
    pageData : state.pageInit.data,        
   
  }
}



const mapDispatchToProps = (dispatch) => {
    return {

      initPageData:(pid) => {

        let me = this;
        axios.post('http://127.0.0.1:3000/api/getPageById',{
          key:pid,
        }).then(function(res){
    
          console.log(res.data._source);
          dispatch(initPageData(res.data._source));
    
        }).catch(function (error) {
          console.log(error);
        });

        
      }     
    }
}






export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchDetail);