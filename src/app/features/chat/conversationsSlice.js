const initialState = null;

function conversationsReducer(state = initialState, action){
    if(action.type === "conversations/initConversaions"){
        return [...action.conversations];
    }
    if(action.type === "conversations/updateConversaions"){
        return [...state];
    }
    return state;
}

export default conversationsReducer;