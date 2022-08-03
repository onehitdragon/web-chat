import { createSlice } from "@reduxjs/toolkit";

const mainMenuSlice = createSlice({
    name: "mainMenu",
    initialState: {
        typeLeftContentShowing: "friends",
        showFriendSearchMain: false,
        showGroupCreationMain: false
    },
    reducers: {
        updateTypeLeftContentShowing(state, action){
            state.typeLeftContentShowing = action.payload;
        },
        updateShowFriendSearchMain(state, action){
            state.showFriendSearchMain = action.payload; 
        },
        updateShowCreationMain(state, action){
            state.showGroupCreationMain = action.payload; 
        }
    }
});

export default mainMenuSlice.reducer;
export const { updateTypeLeftContentShowing, updateShowFriendSearchMain, updateShowCreationMain } = mainMenuSlice.actions;