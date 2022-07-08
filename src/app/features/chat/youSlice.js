const initialState = null;

function youReducer(state = initialState, action){
    if(action.type === "you/updateYou"){
        return {...action.you};
    }
    return state;
}

export default youReducer;