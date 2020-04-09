


// action types 
export const PLUS = 'PLUS';
export const MINUS = 'MINUS';

// action creators


export function updateSearchList(data){
    return {
        type: 'UPDATE_SEARCH_LIST',
        data:data
    }
}



export function changePage(num){
    return {
        type: 'CHANGE_PAGE',
        num:num
    }
}



export function changeInput(input){
    return {
        type: 'UPDATE_INPUT',
        input:input
    }
}


export function selectChange(value){
    return {
        type: 'SELECT_CHANGE',
        selectValue:value
    }
}



export function seachActionT(data){
    return {
        type: 'SEACH_TEXT_TRUE',    
        data: data   
    }
}
export function seachActionF(input){

    return {
        type: 'SEACH_TEXT_FALSE',       
    }
}



export function add(){
    return {
        type : PLUS,
        num :1
    }
};



export function initPageData(data){
    return {
        type: 'PAGE_INIT',
        data:data
    }
}



export function sub(){
    return{
        type : MINUS,
        num : 1
    }
};