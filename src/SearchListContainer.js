
import { connect } from 'react-redux'
import {changePage,dvanceSearch,updateUrlSearchList} from './actions/action.js';
import SearchList from './SearchList';
import axios from 'axios';




  const mapStateToProps = (state) => {
      console.log(state);
      return {
        listData : state.changeInput.outPutData,
        pageValue : state.changeInput.pageValue,  
        keyinput: state.changeInput.input,
        selectValue: state.changeInput.selectValue,  
        is_advance_search: state.changeInput.is_advance_search,
        ad_text: state.homeSearchbox.ad_text,
      }
    }
  



  const headers = {
      'Content-Type': 'application/json',     
    }    
  


  const mapDispatchToProps = (dispatch) => {
    return {



      initPageList(urlText,selectValue){

        axios.post('http://127.0.0.1:3000/api/search',{
          query: urlText,
          option:selectValue,
          page:0
        },{
          headers: headers
        }).then(function(res){   
            dispatch(updateUrlSearchList(urlText,res.data));            
          
        }).catch(function (error) {
          console.log(error);
        });
      },
      
      
      changePage:(paged,key,selectValue,ad_text) => {
        
          console.log(ad_text);

          if(ad_text){
             /*  Advance Search */
            axios.post('http://127.0.0.1:3000/api/f_search',{
              query: key,
              option:selectValue,
              page:paged,
              alaw: ad_text,
              history:[]
            },{
              headers: headers
            }).then(function(res){  
              
              console.log(res);              
              dispatch(dvanceSearch(ad_text,key,res.data,paged));
              dispatch(changePage(paged));
              
            }).catch(function (error) {
              console.log(error);
            });   


          }else{
            /*   No Advance Search */


            axios.post('http://127.0.0.1:3000/api/search',{
              query: key,
              option:selectValue,
              page:paged
            },{
              headers: headers
            }).then(function(res){   
                dispatch(updateUrlSearchList(key,res.data));            
                dispatch(changePage(paged));
            }).catch(function (error) {
              console.log(error);
            });            
            
          
          }
             
      },




        advanceSearch:(advanceKey,keyinput,selectValue) =>{

              axios.post('http://127.0.0.1:3000/api/f_search',{
                query: keyinput,
                option:selectValue,
                page:1,
                alaw: advanceKey,
                history:[]
              },{
                headers: headers
              }).then(function(res){  
                
                dispatch(dvanceSearch(advanceKey,keyinput,res.data,1));
                dispatch(changePage(1));
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

