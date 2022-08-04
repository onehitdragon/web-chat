import { createSlice } from "@reduxjs/toolkit";

const videoCallSlice = createSlice({
    name: "videocall",
    initialState: {
        stream: null
    },
    reducers: {
        updateStream(state, action){
            state.stream = action.payload;
        }
    }
});

export default videoCallSlice.reducer;
export const { updateStream } = videoCallSlice.actions;