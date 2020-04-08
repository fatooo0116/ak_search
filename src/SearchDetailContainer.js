
import { connect } from 'react-redux'
import {initPageData} from './actions/action.js';

import axios from 'axios';
import SearchDetail from './SearchDetail';








const mapStateToProps = (state) => {  

  return {
    initData : state.pageInit.data,        
   
  }
}



const mapDispatchToProps = (dispatch) => {
    return {

    //  onSearchByText:(input) =>{
    //   console.log(input);        
    //  },
      
      initPageData:(data) => {
        dispatch(initPageData(data))
      }
     
    }
}






export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchDetail);