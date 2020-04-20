
import { connect } from 'react-redux'
import {changePage,advanceLawSearch,advanceElementSearch,updateUrlSearchList,load_begin,load_end,remove_ad_text,removeAdElement,removeAdLaw} from './actions/action.js';
import SearchList from './SearchList';
import axios from 'axios';




  const mapStateToProps = (state) => {
      
      return {
        listData : state.changeInput.outPutData,       
        pageValue : state.changeInput.pageValue,  
        keyinput: state.changeInput.input,
        selectValue: state.changeInput.selectValue,  
        is_advance_search: state.changeInput.is_advance_search,
        ad_law_text: state.changeInput.ad_law_text,
        ad_element_text: state.changeInput.ad_element_text,
        loading_status:state.changeInput.loading_status,        
      }
    }
  



  const headers = {
      'Content-Type': 'application/json',     
    }    
  


  const mapDispatchToProps = (dispatch) => {
    return {



      initPageList(urlText,selectValue){

        dispatch(load_begin());

        axios.post('/api/search',{
          query: urlText,
          option:selectValue,
          page:0
        },{
          headers: headers
        }).then(function(res){   
            dispatch(updateUrlSearchList(urlText,res.data)); 

            dispatch(load_end());           
          
        }).catch(function (error) {
          console.log(error);
        });
      },
      
      





      changePage:(paged,key,selectValue,ad_element,ad_law) => {

          if(ad_element.length>0){
            console.log("tag_element");

            axios.post('/api/f_search_element',{
              query: key,
              option:selectValue,
              page:paged,
              alaw: ad_element[0],
              history: ad_element.slice(1)
            },{
              headers: headers
            }).then(function(res){  
              
              dispatch(advanceElementSearch(ad_element, key,res.data,paged));
              dispatch(changePage(paged));
              dispatch(load_end());

            }).catch(function (error) {
              console.log(error);
            });               

          }else if(ad_law.length>0){

            console.log("tag_law");
            axios.post('/api/f_search_law',{
              query: key,
              option:selectValue,
              page:paged,
              alaw: ad_law[0],
              history:ad_law.slice(1)
            },{
              headers: headers
            }).then(function(res){  
              
              dispatch(advanceLawSearch(ad_law,key,res.data,paged));
              dispatch(changePage(paged));
              dispatch(load_end());

            }).catch(function (error) {
              console.log(error);
            });              


          }else{ /* no Tag  */
            // console.log("No Tag");

            dispatch(load_begin());
            axios.post('/api/search',{
              query: key,
              option:selectValue,
              page:paged
            },{
              headers: headers
            }).then(function(res){   
                dispatch(updateUrlSearchList(key,res.data));            
                dispatch(changePage(paged));
                dispatch(load_end());
            }).catch(function (error) {
              console.log(error);
            });               
          }
       
      },




        /*  相關要件 進階  */
        advanceElementSearch:(advanceKey,allAdvanceKey,keyinput,selectValue) =>{
              
              // console.log(advanceKey);
              let newAdKey = [advanceKey, ...allAdvanceKey];

              // console.log(newAdKey.slice(1));                          
                                         
              dispatch(load_begin());
             
              const headers = {
                'Content-Type': 'application/json',     
              }   
              
         
              axios.post('/api/f_search_element',{
                query: keyinput,
                option:selectValue,
                page:1,
                alaw: newAdKey[0],
                history:newAdKey.slice(1)
              },{
                headers: headers
              }).then(function(res){  
                console.log(res);
                dispatch(advanceElementSearch(newAdKey, keyinput,res.data,1));
                dispatch(changePage(1));
                dispatch(load_end());

              }).catch(function (error) {
                console.log(error);
              });       
              
                    
        },





        /*  相關法條 進階  */
        advanceLawSearch:(advanceKey,allAdvanceKey,keyinput,selectValue) =>{

              let newAdKey = [advanceKey, ...allAdvanceKey];
              
              dispatch(load_begin());

              axios.post('/api/f_search_law',{
                query: keyinput,
                option:selectValue,
                page:1,
                alaw: newAdKey[0],
                history:newAdKey.slice(1)
              },{
                headers: headers
              }).then(function(res){  
                
                dispatch(advanceLawSearch(newAdKey,keyinput,res.data,1));
                dispatch(changePage(1));
                dispatch(load_end());

              }).catch(function (error) {
                console.log(error);
              });  
              
          
        },





        removeAdElement:(adKey,alladkey,key,selectValue) =>{

            console.log(alladkey);

           let newAllkey = alladkey.filter(key => key != adKey);

           if(newAllkey.length>0){
              axios.post('/api/f_search_element',{
                query: key,
                option:selectValue,
                page:1,
                alaw: newAllkey[0],
                history: newAllkey.slice(1)
              },{
                headers: headers
              }).then(function(res){  
                console.log(res);
                dispatch(advanceElementSearch(newAllkey, key,res.data,1));
                dispatch(changePage(1));
                dispatch(load_end());
    
              }).catch(function (error) {
                console.log(error);
              });   

           }else{
              axios.post('/api/search',{
                query: key,
                option:selectValue,
                page:1
              },{
                headers: headers
              }).then(function(res){   
                  dispatch(updateUrlSearchList(key,res.data));  
  
                  dispatch(removeAdElement());          
  
                  dispatch(changePage(1));
                  dispatch(load_end());
              }).catch(function (error) {
                console.log(error);
              }); 
           }
           
        },






        removeAdLaw:(adKey,alladkey,key,selectValue) =>{

          let newAllkey2 = alladkey.filter(key => key != adKey);

          if(newAllkey2.length>0){
            axios.post('/api/f_search_law',{
              query: key,
              option:selectValue,
              page:1,
              alaw: newAllkey2[0],
              history: newAllkey2.slice(1)
            },{
              headers: headers
            }).then(function(res){  
              console.log(res);
              dispatch(advanceLawSearch(newAllkey2, key,res.data,1));
              dispatch(changePage(1));
              dispatch(load_end());
  
            }).catch(function (error) {
              console.log(error);
            });   

         }else{

            axios.post('/api/search',{
              query: key,
              option:selectValue,
              page:1
            },{
              headers: headers
            }).then(function(res){   
                dispatch(updateUrlSearchList(key,res.data));  

                dispatch(removeAdLaw());          

                dispatch(changePage(1));
                dispatch(load_end());
            }).catch(function (error) {
              console.log(error);
            }); 
         }

       }
       
       



    }
  }





  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchList);

