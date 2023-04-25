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
        },
        showCallVideoMain: false
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
        },
        updateStatusCallVieoDialog(state, action){
            state.callVieoDialog.status = action.payload;
        },
        hideCallVideoDialog(state){
            state.callVieoDialog.show = false;
        },
        removeButtonCallVideoDialog(state, action){
            state.callVieoDialog.buttons.splice(action.payload, 1);
        },
        updateShowCallVideoMain(state, action){
            state.showCallVideoMain = action.payload; 
        }
    }
});

export default mainMenuSlice.reducer;
export const { updateTypeLeftContentShowing, updateShowFriendSearchMain, updateShowCreationMain,
    updateCallVieoDialog, updateStatusCallVieoDialog, hideCallVideoDialog, updateShowCallVideoMain, 
    removeButtonCallVideoDialog } = mainMenuSlice.actions;