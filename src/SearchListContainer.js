
import { connect } from 'react-redux'
// import {  } from '../actions/action.js';
import SearchList from './SearchList';
 // import axios from 'axios';




  const mapStateToProps = (state) => {
      return {
        listData : state.changeInput.outPutData,      
      }
    }
  


  const mapDispatchToProps = (dispatch) => {
    return {


    }
  }





  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchList);

