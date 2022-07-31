import {createSlice} from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        conversationKeyword: "",
        conversationIdFounds: []
    },
    reducers: {
        updateConversationKeyword(state, action){
            state.conversationKeyword = action.payload;
        },
        addConversationIdFound(state, action){
            if(state.conversationIdFounds.find((id) => id === action.payload) === undefined){
                state.conversationIdFounds.push(action.payload);
            }
        },
        removeConversationIdFound(state, action){
            state.conversationIdFounds = state.conversationIdFounds.filter((id) => id !== action.payload);
        }
    }
});

export default searchSlice.reducer;
export const { updateConversationKeyword, addConversationIdFound, removeConversationIdFound } = searchSlice.actions;