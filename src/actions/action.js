


// action types 
export const PLUS = 'PLUS';
export const MINUS = 'MINUS';

// action creators


export function tag1_openfn(status){
    return {
        type:'TAG1_OPEN',
        status:status
    }
}

export function tag2_openfn(status){
    return {
        type:'TAG2_OPEN',
        status:status
    }
}


export function changeDetailPage(status){
    return {
        type:'CHANGE_DETAIL_PAGE',
        status:status
    }
}

export function showMiniDetailPage(data){
    return {
        type:'MINI_DETAIL_PAGE',
        data:data
    }
}




export function tab_change(page){
    return {
        type:'TAB_CHANGE',
        page:page
    }
}



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


export function advanceElementLawSearch(element, law, totalTag, key, data, paged){
    return {
        type:'ADVANCE_ELEMENT_LAW_SEARCH',        
        element:element,
        law:law,        
        input:key,
        totalTag:totalTag,
        data:data,
        paged:paged
    }
}


/*
export function advanceLawSearch(ad_law_text,total_law_element_key,input,data,paged){
    return {
        type:'ADVANCE_LAW_SEARCH',        
        ad_law_text: ad_law_text,
        total_law_element_key:total_law_element_key,
        input:input,
        data:data,
        paged:paged
    }
}

export function advanceElementSearch(ad_element_text,total_law_element_key,input,data,paged){
    return {
        type:'ADVANCE_ELEMENT_SEARCH',
        ad_element_text: ad_element_text,
        total_law_element_key:total_law_element_key,
        input:input,
        data:data,
        paged:paged
    }
}
*/


export function removeAdElement(key){
    return {
        type:'REMOVE_AD_ELEMENT',
    }
}


export function removeAdLaw(key){
    return {
        type:'REMOVE_AD_LAW',
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

export function pageDetailMark(label,pos){
    return {
        type: 'PAGE_DETAIL_MARK',
        label:label,
        pos:pos
    }
}



export function sub(){
    return{
        type : MINUS,
        num : 1
    }
};

export function changeWindowScroll(data){
    return {
        type: 'PAGE_SCROLL',
        data:data        
    }
}