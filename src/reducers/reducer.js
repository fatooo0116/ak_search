import { combineReducers } from 'redux';
import { PLUS, MINUS } from '../actions/action.js';

const initialData = {
    value : 0,
}

const searchInitialData = {
  input : '',
  isSearchAction:false,
  outPutData:[]
}

/*

    let searchText = this.state.searchText;    
    const headers = {
      'Content-Type': 'application/json',     
    }    

    if(searchText !=''){
      axios.post('http://127.0.0.1:3000/api/search',{
        query:'賠償',
        option:"text",
        page:0
      },{
         headers: headers
       }).then(function(res){
        console.log(res);
      }).catch(function (error) {
        console.log(error);
      });
    }

*/






// Reducer
function changeInput(state = searchInitialData, action){
    switch(action.type){
        case('UPDATE_INPUT'):          
         // console.log(state);
          return Object.assign({},state,{
            input : action.input
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
    calculator
});

export default calculatorApp;