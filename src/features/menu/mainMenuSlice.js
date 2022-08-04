import { createSlice } from "@reduxjs/toolkit";

const mainMenuSlice = createSlice({
    name: "mainMenu",
    initialState: {
        typeLeftContentShowing: "friends",
        showFriendSearchMain: false,
        showGroupCreationMain: false,
        callVieoDialog: {
            show: false,
            friend: null,
            status: "",
            buttons: []
        }
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
        },
        updateCallVieoDialog(state, action){
            state.callVieoDialog = action.payload;
        }
    }
});

export default mainMenuSlice.reducer;
export const { updateTypeLeftContentShowing, updateShowFriendSearchMain, updateShowCreationMain,
    updateCallVieoDialog } = mainMenuSlice.actions;