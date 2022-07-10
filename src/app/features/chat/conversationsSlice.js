const initialState = null;

function conversationsReducer(state = initialState, action){
    if(action.type === "conversations/initConversaions"){
        return [...action.conversations];
    }
    if(action.type === "conversations/updateConversaions"){
        return [...state];
    }
    if(action.type === "conversations/updateConversaion"){
        const conversations = [...state];
        conversations.find((conversation, index) => {
            if(conversation.id === action.conversation.id){
                conversations[index] = action.conversation;
                return true;
            }
            return false;
        });

        return conversations;
    }
    return state;
}

export default conversationsReducer;