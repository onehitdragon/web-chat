import {createSlice} from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        conversationKeyword: "",
        contentMessageKeyword: ""
    },
    reducers: {
        updateConversationKeyword(state, action){
            state.conversationKeyword = action.payload;
        },
        updateContentMessageKeyword(state, action){
            state.contentMessageKeyword = action.payload;
        }
    }
});

export default searchSlice.reducer;
export const { updateConversationKeyword, updateContentMessageKeyword } = searchSlice.actions;