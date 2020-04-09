
import { connect } from 'react-redux'
import {changePage,updateSearchList} from './actions/action.js';
import SearchList from './SearchList';
import axios from 'axios';




  const mapStateToProps = (state) => {
      console.log(state);
      return {
        listData : state.changeInput.outPutData,
        pageValue : state.changeInput.pageValue,  
        keyinput: state.changeInput.input,
        selectValue: state.changeInput.selectValue  
      }
    }
  



  const headers = {
      'Content-Type': 'application/json',     
    }    
  


  const mapDispatchToProps = (dispatch) => {
    return {

      
      changePage:(paged,key,selectValue) => {

            console.log("=>"+key)

            axios.post('http://127.0.0.1:3000/api/search',{
              query: key,
              option:selectValue,
              page:paged
            },{
              headers: headers
            }).then(function(res){   
              dispatch(updateSearchList(res.data));   
              dispatch(changePage(paged));
              
            }).catch(function (error) {
              console.log(error);
            });

           
       
      }


    }
  }





  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchList);

