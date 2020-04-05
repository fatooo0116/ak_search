
import { connect } from 'react-redux'
import { add, sub ,changeInput,seachActionT,seachActionF } from '../actions/action.js';
import SearchBox from './SearchBox';
 
import axios from 'axios';



  const mapStateToProps = (state) => {
  
      return {
        value : state.calculator.value,      
        input : state.changeInput.input,  
        isSearchAction : state.changeInput.isSearchAction  
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

      onSearchByText:(input) =>{

        console.log(input);        
        axios.post('http://127.0.0.1:3000/api/search',{
          query:'賠償',
          option:"text",
          page:0
        },{
           headers: headers
         }).then(function(res){
           
          console.log(res);
          dispatch(seachActionT(res.data));
  
        }).catch(function (error) {
          console.log(error);
        });
      },

      resetRedirect(){
        dispatch(seachActionF());
      },

      initRedirect:()=>{
        dispatch(seachActionF());
      },



      
      onClickAdd: () => {
        dispatch(add());
        // dispatch(earchByText());
        // alert("xxx");
        // window.location = '/search'
      },
      onClickSub: () =>{
        dispatch(sub());
      }
    }
  }





  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchBox);

