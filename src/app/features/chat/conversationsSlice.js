import { createSelector, createSlice } from "@reduxjs/toolkit";
import doRequestApi from "../../../tools/doRequestApi";
import { loadedYou } from "./youSlice";

const conversationsSlice = createSlice({
    initialState: {
        conversations: null,
        currentConversationId: null
    },
    name: "conversations",
    reducers: {
        loadedConversations: (state, action) => {
            state.conversations = action.payload;
        },
        setCurrentConversationId: (state, action) => {
            state.currentConversationId = action.payload.id;
        },
        setScroll: (state, action) => {
            state.conversations.find((conversation) => {
                if(conversation.id === state.currentConversationId){
                    conversation.scroll = action.payload;
                    return true;
                }
                return false;
            });
        },
        addYourNewMessage: (state, action) => {
            const currentConversation = findCurrentConversation(state.conversations, state.currentConversationId);
            currentConversation.scroll = undefined;
            currentConversation.messages.push(action.payload.newMessage);
        },
        addNewMessage: (state, action) => {
            let conversationFound = state.conversations.find(conversation => conversation.id === action.payload.idConversation);
            const newMessage = action.payload.newMessage;
            const you = action.payload.you;
            const sender = newMessage.sender;
            if(sender.id === you.id){
                const justSentMessage = conversationFound.messages.find((message) => {
                    if(message.netId === action.payload.netId){
                        // replace
                        message.id = newMessage.id;
                        message.status = "success";
                        return true;
                    }
                    return false;
                });
                if(justSentMessage === undefined){
                    conversationFound.messages.push({...newMessage, status: "success"});
                }
            }
            else{
                const result = conversationFound.messages.find((message, index) => {
                    if(message.status === "load"){
                        // insert before
                        conversationFound.messages.splice(index, 0, newMessage);
                        return true;
                    }
                    return false;
                });
                if(result === undefined){
                    conversationFound.messages.push(newMessage);
                }
                if(conversationFound.scroll !== undefined){
                    conversationFound.scroll = -1;
                }
                conversationFound.amountMessageNotRead += 1;
            }
        },
        removeAmountMessageNotRead: (state, action) => {
            const currentConversation = findCurrentConversation(state.conversations, state.currentConversationId);
            if(currentConversation.amountMessageNotRead > 0){
                currentConversation.amountMessageNotRead = 0;
            }
        },
        updateTyping: (state, action) => {
            const conversationFound = state.conversations.find(conversation => conversation.id === action.payload.idConversation);
            const participants = conversationFound.participants;
            participants.find(participant => {
                if(participant.id === action.payload.idUser){
                    participant.typing = action.payload.typing;
                    return true;
                }
                return false;
            });
            conversationFound.scroll = -1;
        },
        updateStateFileMessage: (state, action) => {
            const currentConversation = findCurrentConversation(state.conversations, state.currentConversationId);
            const messages = currentConversation.messages;
            messages.find(message => {
                if(message.id === action.payload.idMessage){
                    message.typeFile = action.payload.typeFile; 
                    message.src = action.payload.src;
                    message.loaded = action.payload.loaded;
                    return true;
                }
                return false;
            });
        }
    }
});

function findCurrentConversation(conversations, currentConversationId){
    return conversations.find(conversation => conversation.id === currentConversationId);
}

export default conversationsSlice.reducer;
export const { loadedConversations, setCurrentConversationId, setScroll, addYourNewMessage,
    haveNewMessage, addNewMessage, removeAmountMessageNotRead, updateTyping, updateStateFileMessage}
    = conversationsSlice.actions;

const selectConversations = (state) => state.conversations.conversations;
const selectCurrentConversaionId = (state) => state.conversations.currentConversationId;
const selectCurrentConversaion = createSelector(
    selectConversations,
    selectCurrentConversaionId,
    findCurrentConversation
);

export { selectConversations, selectCurrentConversaionId, selectCurrentConversaion };

// function actions
const loadConversaions = (whenLoaded) => {
    return (dispatch, getState) => {
        doRequestApi('http://127.0.0.1:5001/home/index', 'GET')
        .then((data) => {
            console.log(data);
            dispatch(loadedYou(data.you));
            dispatch(loadedConversations(data.listConversation));
            whenLoaded();
        })
    }
}

export { loadConversaions }