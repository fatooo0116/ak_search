


// action types 
export const PLUS = 'PLUS';
export const MINUS = 'MINUS';

// action creators



export function changeInput(input){
    return {
        type: 'UPDATE_INPUT',
        input:input
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





export function sub(){
    return{
        type : MINUS,
        num : 1
    }
};