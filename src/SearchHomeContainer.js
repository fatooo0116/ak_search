
import { connect } from 'react-redux'
import {homeTextChange,onSelectChange,homeSearchSubmit } from './actions/action.js';
import SearchHome from './SearchHome';
import axios from 'axios';




  const mapStateToProps = (state) => {     
      return {
        input : state.homeSearchbox.input,
        selectValue: state.homeSearchbox.selectValue,     
        isSearchAction: state.homeSearchbox.isSearchAction      
      }
    }
  






  const mapDispatchToProps = (dispatch) => {
    return {
      
      onTextChange:(text) => {
        dispatch(homeTextChange(text))
      },

      onSelectChange:(value) =>{
        dispatch(onSelectChange(value))
      },

      onHomeSearchSubmit:(text,selectValue)=>{    
           
        dispatch(homeSearchSubmit(text,selectValue));
      }

    }
  }





  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchHome);

