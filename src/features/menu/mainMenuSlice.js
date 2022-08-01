import { createSlice } from "@reduxjs/toolkit";

const mainMenuSlice = createSlice({
    name: "mainMenu",
    initialState: {
        typeLeftContentShowing: "conversations"
    },
    reducers: {
        updateTypeLeftContentShowing(state, action){
            state.typeLeftContentShowing = action.payload;
        }
    }
});

export default mainMenuSlice.reducer;
export const { updateTypeLeftContentShowing } = mainMenuSlice.actions;