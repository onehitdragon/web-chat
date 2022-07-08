const initialSate = null;

function currentConversationReducer(state = initialSate, action){
    if(action.type === "currentConversation/setCurrentConversation"){
        return action.currentConversation;
    }
    return state;
}

export default currentConversationReducer;