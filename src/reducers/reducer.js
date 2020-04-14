import { combineReducers } from 'redux';
import { PLUS, MINUS } from '../actions/action.js';


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
  is_advance_search:false,
  loading_status:false
}

const pageData = {
  data:'',
  main_text:'',
  maked:'',
  modal_open: false,
  model_text:''
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






/*  page detail  initial   */
function pageInit(state = pageData, action){
  switch(action.type){
    case('PAGE_INIT'):
        let main_text = (action.data._source.text)? action.data._source.text :'';       
      return Object.assign({},state,{
        data : action.data,
        main_text: main_text,
        maked:''        
      });


    case('PAGE_DETAIL_MARK'):                
      return Object.assign({},state,{
        maked : action.data,
        main_text: action.main_text
      });


      case('DETAIL_MODAL_OPEN'):                     
        return Object.assign({},state,{
          modal_open: true,
          model_text: action.text
        });
      
      
      case('DETAIL_MODAL_CLOSE'):                
      return Object.assign({},state,{
        modal_open: false,
        model_text:''
      });      


      
    default:
      return state
  }
}






// Reducer
function changeInput(state = searchInitialData, action){
    switch(action.type){

        case('LOADING_ACTION'):
          return Object.assign({},state,{
            loading_status: action.status,          
          });


        case('DETAIL_LOADING_ACTION'):
          return Object.assign({},state,{
            detail_loading_status: action.status,          
          });  
      

        case('ADVANCE_SEARCH'):
          return Object.assign({},state,{
            ad_text: action.ad_text,
            input : action.input,
            outPutData:action.data,
            pageValue: action.paged
          });

        case('REMOVE_AD_TEXT'):
        return Object.assign({},state,{
          ad_text: ''
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
            input : action.input,
            outPutData: action.data          
          });

        case('SEACH_TEXT_FALSE'):          
          return Object.assign({},state,{
            isSearchAction : false
          });          

        case('SELECT_CHANGE'):              
        //console.log(action.selectValue);        
          return Object.assign({},state,{
            selectValue : action.selectValue
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
            outPutData: action.data,
            isSearchAction:false           
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