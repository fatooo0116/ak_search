


// action types 
export const PLUS = 'PLUS';
export const MINUS = 'MINUS';

// action creators



export function detail_model_open(text){
    return {
        type:'DETAIL_MODAL_OPEN',
        text:text
    }
}

export function detail_model_close(){
    return {
        type:'DETAIL_MODAL_CLOSE'          
    }
}


export function remove_ad_text(){
    return {
        type:'REMOVE_AD_TEXT',        
    }
}

export function detail_load_begin(){
    return {
        type:'DETAIL_LOADING_ACTION',
        status:true
    }
}


export function detail_load_end(){
    return {
        type:'DETAIL_LOADING_ACTION',
        status:false
    }
}


export function load_begin(){
    return {
        type:'LOADING_ACTION',
        status:true
    }
}


export function load_end(){
    return {
        type:'LOADING_ACTION',
        status:false
    }
}



export function dvanceSearch(ad_text,input,data,paged){
    return {
        type:'ADVANCE_SEARCH',
        ad_text:ad_text,
        input:input,
        data:data,
        paged:paged
    }
}



export function homeTextChange(text){
    return {
        type:'HOME_TEXT_CHANGE',
        input:text
    }
}



export function homeSearchSubmit(text,value){   
    return {
        type:'HOME_SEARCH_SUBMIT',
        input:text,   
        selectValue:value,
        isSearchAction:true     
    }
}



export function onSelectChange(value){
    return {
        type:'HOME_SELECT_CHANGE',
        value:value,           
    }
}



export function updateUrlSearchList(text,data){
    return {
        type: 'UPDATE_URL_SEARCH_LIST',
        text:text,
        data:data
    }
}


export function updateSearchList(text,data){
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



export function seachActionT(input,data){
    return {
        type: 'SEACH_TEXT_TRUE',  
        input:input,  
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

export function pageDetailMark(data,main_text){
    return {
        type: 'PAGE_DETAIL_MARK',
        data:data,
        main_text:main_text
    }
}



export function sub(){
    return{
        type : MINUS,
        num : 1
    }
};