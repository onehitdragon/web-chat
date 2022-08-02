import { createSlice } from "@reduxjs/toolkit";

const friendsSlice = createSlice({
    name: "friends",
    initialState: {
        friends: null,
        questingByOthers: null,
        questingByYous: null
    },
    reducers: {
        loadedFriends(state, action){
            state.friends = action.payload;
        },
        loadedQuestingByOthers(state, action){
            state.questingByOthers = action.payload;
        },
        loadedQuestingByYous(state, action){
            state.questingByYous = action.payload;
        }
    }
});

export default friendsSlice.reducer;
export const { loadedFriends, loadedQuestingByOthers, loadedQuestingByYous } = friendsSlice.actions;