import {createSlice} from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        conversationKeyword: "",
        contentMessageKeyword: "",
        searchInviteKeyword: ""
    },
    reducers: {
        updateConversationKeyword(state, action){
            state.conversationKeyword = action.payload;
        },
        updateContentMessageKeyword(state, action){
            state.contentMessageKeyword = action.payload;
        },
        updateSearchInviteKeyword(state, action){
            state.searchInviteKeyword = action.payload;
        }
    }
});

export default searchSlice.reducer;
export const { updateConversationKeyword, updateContentMessageKeyword, updateSearchInviteKeyword } = searchSlice.actions;