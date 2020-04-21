
import { connect } from 'react-redux'
import { 
          changePage,
          advanceElementLawSearch,
          updateUrlSearchList,
          load_begin,load_end,
          remove_ad_text,
          removeAdElement,
          removeAdLaw,
          tag1_openfn,
          tag2_openfn
        } from './actions/action.js';
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
        total_law_element_key: state.changeInput.total_law_element_key,
        loading_status:state.changeInput.loading_status, 
        tag1_open:state.changeInput.tag1_open,  
        tag2_open:state.changeInput.tag2_open,     
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
      
      





      changePage:(paged,key,selectValue,ad_element,ad_law,total_law_element_key) => {

        
        // console.log(total_law_element_key);

          if(total_law_element_key.length>0){            
           
              axios.post('/api/f_search',{
                query: key,
                option:selectValue,
                page:paged,
                alaw: total_law_element_key[0],
                history:total_law_element_key.slice(1)
              },{
                headers: headers
              }).then(function(res){  

                // dispatch(advanceLawSearch(ad_law,key,res.data,paged));
                dispatch(advanceElementLawSearch( 
                                                ad_element, 
                                                ad_law,
                                                total_law_element_key, 
                                                key, 
                                                res.data,
                                                paged)); 

                dispatch(changePage(paged));
                dispatch(load_end());

              }).catch(function (error) {
                console.log(error);
              });              


          }else{ /* no Tag  */
           

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
        advanceElementSearch:(advanceKey,allElementKey,allLawKey,keyinput,selectValue) =>{

          
              let obj = {
                'id':'element',
                'value':advanceKey
              };
              let total_law_element_key = [obj, ...allElementKey, ...allLawKey];                      
               


                          
              dispatch(load_begin());
             
              const headers = {
                'Content-Type': 'application/json',     
              }                 
         
              axios.post('/api/f_search',{
                query: keyinput,
                option:selectValue,
                page:1,
                alaw: total_law_element_key[0],
                history:total_law_element_key.slice(1)
              },{
                headers: headers
              }).then(function(res){  
               // console.log(res);

                dispatch(advanceElementLawSearch([obj, ...allElementKey],allLawKey ,total_law_element_key, keyinput, res.data,1));  
                
                dispatch(changePage(1));
                dispatch(load_end());

              }).catch(function (error) {
                console.log(error);
              });       

                                                
        },





        /*  相關法條 進階  */
        advanceLawSearch:(advanceKey,allElementKey,allLawKey,keyinput,selectValue) =>{



              let obj = {
                id:"law",
                value:advanceKey
              }
              let total_law_element_key = [obj,...allLawKey, ...allElementKey]; 

            //  console.log(allElementKey);
            //  console.log(allLawKey);
            //  console.log(newAdKeyArray);
           // console.log(total_law_element_key);
              
              dispatch(load_begin());

              axios.post('/api/f_search',{
                query: keyinput,
                option:selectValue,
                page:1,
                alaw: total_law_element_key[0],
                history: total_law_element_key.slice(1)
              },{
                headers: headers
              }).then(function(res){  
                
                dispatch(advanceElementLawSearch(allElementKey,[obj,...allLawKey] ,total_law_element_key, keyinput, res.data,1));  

                // dispatch(advanceLawSearch([obj,...allLawKey],total_law_element_key,keyinput,res.data,1));
                dispatch(changePage(1));
                dispatch(load_end());

              }).catch(function (error) {
                console.log(error);
              });  
              
          
        },





        removeAdElement:(adKey,elementKey,lawKey,key,selectValue) =>{

           

           let newElement = elementKey.filter(item => item.value != adKey.value);            
          
           let newAllkey = (newElement.length==0)? [...lawKey] : [...newElement].concat([...lawKey]);;
          


           if(newAllkey.length>0){
              axios.post('/api/f_search',{
                query: key,
                option:selectValue,
                page:1,
                alaw: newAllkey[0],
                history: newAllkey.slice(1)
              },{
                headers: headers
              }).then(function(res){  
               //  console.log(res);
                
                
                dispatch(advanceElementLawSearch(newElement,lawKey,newAllkey, key,res.data,1));                               

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
                //  dispatch(updateUrlSearchList(key,res.data));  

                  dispatch(advanceElementLawSearch([],[],[], key,res.data,1)); 
  
                  dispatch(removeAdElement());          
  
                  dispatch(changePage(1));
                  dispatch(load_end());
              }).catch(function (error) {
                console.log(error);
              }); 
           }
           
        },






        removeAdLaw:(adKey,elementKey,lawKey,key,selectValue) =>{

          let newLaw = lawKey.filter(item => item.value != adKey.value);

          let newAllkey2 = (newLaw.length==0)? [...elementKey] : [...newLaw].concat([...elementKey]);
        
          // console.log(newAllkey2);
       

          if(newAllkey2.length>0){
            axios.post('/api/f_search',{
              query: key,
              option:selectValue,
              page:1,
              alaw: newAllkey2[0],
              history: newAllkey2.slice(1)
            },{
              headers: headers
            }).then(function(res){  
              // console.log(res);

              dispatch(advanceElementLawSearch(elementKey,newLaw ,newAllkey2, key, res.data,1));   
                                          
              
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
                // dispatch(updateUrlSearchList(key,res.data));  
                dispatch(advanceElementLawSearch([],[],[], key,res.data,1)); 

                dispatch(removeAdLaw());          

                dispatch(changePage(1));
                dispatch(load_end());
            }).catch(function (error) {
              console.log(error);
            }); 
         }

       },


       tag1_openfn:(status) =>{
          dispatch(tag1_openfn(status));     
       },

       tag2_openfn:(status) =>{
         dispatch(tag2_openfn(status));     
       },
       



    }
  }





  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchList);

