
import { connect } from 'react-redux'
import { 
          selectChange,
          changeInput,
          seachActionT,
          seachActionF,
          load_end,
          load_begin
        } from '../actions/action.js';
import SearchBox from './SearchBox';
 
import axios from 'axios';



  const mapStateToProps = (state) => {
  
      return {
        value : state.calculator.value,      
        input : state.changeInput.input,  
        isSearchAction : state.changeInput.isSearchAction,
        selectValue:state.changeInput.selectValue,
        paged:0
      }
    }
  



  const headers = {
    'Content-Type': 'application/json',     
  }    

 


  const mapDispatchToProps = (dispatch) => {
    return {

      onChangeInput:(input) => {  
        dispatch(changeInput(input));
      },

      onSearchByText:(input,selected,paged) =>{     

        dispatch(load_begin());
        axios.post('/api/search',{
          query: input,
          option:selected,
          page:paged
        },{
           headers: headers
         }).then(function(res){
           
          // console.log(res);
          dispatch(load_end());
          dispatch(seachActionT(input,res.data));
  
        }).catch(function (error) {
          console.log(error);
        });
      },


      onSelectChange(value){        
        dispatch(selectChange(value));
      },




 






    }
  }





  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchBox);

