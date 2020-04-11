import { combineReducers } from 'redux';
import { PLUS, MINUS } from '../actions/action.js';
import axios from 'axios';

const initialData = {
    value : 0,
}

const searchInitialData = {
  input:'',
  isSearchAction:false,
  outPutData:[],
  selectValue:'text',
  pageValue:0,
  ad_text:'',
  is_advance_search:false
}

const pageData = {
  data:''
}









// Reducer
function homeSearchbox(state = searchInitialData, action){
  switch(action.type){


      case('HOME_TEXT_CHANGE'):
        return Object.assign({},state,{
          input: action.input
        });

      case('HOME_SEARCH_SUBMIT'):

        console.log(action);

        return Object.assign({},state,{
          input : action.input,
          selectValue:action.selectValue,
          isSearchAction:action.isSearchAction,
          is_advance_search:false,
        });  
      

      case('HOME_SELECT_CHANGE'):
      return Object.assign({},state,{       
        selectValue:action.value     
      });

      default:
        return state
      }
    }







function pageInit(state = pageData, action){
  switch(action.type){
    case('PAGE_INIT'):

      return Object.assign({},state,{
        data : action.data
      });


    default:
      return state
  }
}






// Reducer
function changeInput(state = searchInitialData, action){
    switch(action.type){


        case('ADVANCE_SEARCH'):
          return Object.assign({},state,{
            ad_text: action.ad_text,
            input : action.input,
            outPutData:action.data,
            pageValue: action.paged
          });


        case('UPDATE_INPUT'):          
         // console.log(state);
          return Object.assign({},state,{
            input : action.input,
            is_advance_search:false,
            pageValue:0
          });

        case('SEACH_TEXT_TRUE'):          
          return Object.assign({},state,{
            isSearchAction : true,
            outPutData: action.data          
          });

        case('SEACH_TEXT_FALSE'):          
          return Object.assign({},state,{
            isSearchAction : false
          });          

        case('SELECT_CHANGE'):              
        //console.log(action.selectValue);        
          return Object.assign({},state,{
            isSearchAction : action.selectValue
          });   

        case('CHANGE_PAGE'):
          return Object.assign({},state,{
            pageValue : action.num
          });   


        case('UPDATE_SEARCH_LIST'):
          return Object.assign({},state,{         
            outPutData: action.data  
          });   


        case('UPDATE_URL_SEARCH_LIST'):
          return Object.assign({},state,{
            input:action.text,
            outPutData: action.data           
          });  

         


        default:
          return state
    }
  }






function calculator(state = initialData, action){
    switch(action.type){
        case PLUS:
        console.log("++");
            return Object.assign({},state,{
                value : state.value + action.num
            });
        case MINUS:
        console.log("--");
            return Object.assign({},state,{
                value : state.value - action.num
            });
        default:
            return state;
    }
}



const calculatorApp = combineReducers({
    changeInput,
    calculator,
    pageInit,
    homeSearchbox
});

export default calculatorApp;