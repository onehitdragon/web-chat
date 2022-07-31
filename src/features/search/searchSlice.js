import {createSlice} from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        conversationKeyword: ""
    },
    reducers: {
        updateConversationKeyword(state, action){
            state.conversationKeyword = action.payload;
        }
    }
});

export default searchSlice.reducer;
export const { updateConversationKeyword } = searchSlice.actions;