import { createSlice } from "@reduxjs/toolkit";

const friendsSlice = createSlice({
    name: "friends",
    initialState: {
        friends: null
    },
    reducers: {
        loadedFriends(state, action){
            state.friends = action.payload;
        }
    }
});

export default friendsSlice.reducer;
export const { loadedFriends } = friendsSlice.actions;