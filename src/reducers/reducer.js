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
  ad_law_text:[],
  ad_element_text:[],
  is_advance_search:false,
  loading_status:false
}

const pageData = {
  data:'',
  main_text:'',
  maked:'',
  pos:[],
  modal_open: false,
  model_text:'',
  relative_tab:0,
  detail_page:0, /* relative post 0 => all doc, 1 => single doc  */
  mini_detail_title:'',
  mini_detail_time:'',
  mini_detail_reason:'',
  mini_detail_text:'',
  page_offset:''
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


    case('PAGE_SCROLL'):
      return Object.assign({},state,{
        page_offset : action.data,     
      });
    


    case('CHANGE_DETAIL_PAGE'):
      if(action.status==0){
        return Object.assign({},state,{
          detail_page : action.status, 
          mini_detail_title: '',
          mini_detail_time: '',
          mini_detail_reason: '',
          mini_detail_text: '',       
        });
      }else{
        return Object.assign({},state,{
          detail_page : action.status,     
        });
      }



    case('MINI_DETAIL_PAGE'): 

      console.log(action.data);

      return Object.assign({},state,{          
        mini_detail_title: action.data.title,
        mini_detail_time: action.data.time,
        mini_detail_reason: action.data.judge_reason,
        mini_detail_text: action.data.text,          
      }); 


    case('PAGE_INIT'):
        let main_text = (action.data._source.text)? action.data._source.text :'';       
      return Object.assign({},state,{
        data : action.data,
        main_text: main_text,
        maked:''        
      });


    case('PAGE_DETAIL_MARK'):                
      return Object.assign({},state,{
        maked : action.label,
        pos : action.pos,
        relative_tab:0
       // detail_page:0
       // main_text: action.main_text
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
      
      case('TAB_CHANGE'): 
        return Object.assign({},state,{
          relative_tab:action.page
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
      

        case('ADVANCE_LAW_SEARCH'):
          // let new_law = [action.ad_law_text, ...state.ad_law_text];
          console.log(action.ad_law_text);
          return Object.assign({},state,{
            ad_element_text:[],
            ad_law_text: action.ad_law_text,
            input : action.input,
            outPutData:action.data,
            pageValue: action.paged
          });


        case('ADVANCE_ELEMENT_SEARCH'):
          // let new_elemnet = [action.ad_law_element, ...state.ad_law_element];
          return Object.assign({},state,{
            ad_element_text : action.ad_element_text,
            ad_law_text:[],
            input : action.input,
             outPutData:action.data,
            pageValue: action.paged
          });          


        case('REMOVE_AD_ELEMENT'):           
          return Object.assign({},state,{
            ad_element_text: []
          });


        case('REMOVE_AD_LAW'):        
          return Object.assign({},state,{
            ad_law_text: []
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