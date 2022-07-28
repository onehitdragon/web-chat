import {createSlice} from "@reduxjs/toolkit";
const signalr = require('@microsoft/signalr');

const socketSlice = createSlice({
    name: "socket",
    initialState: null,
    reducers: {
        buildSocket(state, action){
            return (
                new signalr.HubConnectionBuilder()
                    .withUrl(action.payload.url)
                    .build()
            );
        }
    }
});

export default socketSlice.reducer;
export const { buildSocket } = socketSlice.actions;

const startSocket = (whenSocketStart) => {
    return (dispatch, getState) => {
        if(getState().socket !== null){
            getState().socket.start()
            .then(() => {
                whenSocketStart();
            })
            .catch(e => {
                console.log(e);
            });
        }
    }
}

export { startSocket }