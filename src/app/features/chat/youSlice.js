import { createSlice } from "@reduxjs/toolkit";
import doRequestApi from "../../../tools/doRequestApi";

const youSlice = createSlice({
    name: "you",
    initialState: {
        info: undefined
    },
    reducers: {
        loadedYou(state, action){
            state.info = action.payload;
        }
    }
});

const checkStatus = (doLogin, doNotLogin) => {
    return (dispatch, getState) => {
        doRequestApi('http://127.0.0.1:5001/account/CheckLogined', 'GET')
        .then((data) => {
            if(data.logined){
                doLogin();
            }
            else{
                doNotLogin();
            }
        })
    }
}

const login = (email, password, processResponse) => {
    return (dispatch, getState) => {
        const res = doRequestApi('http://127.0.0.1:5001/account/login', 'POST', {
            contentType: 'application/x-www-form-urlencoded',
            body: `email=${email}&password=${password}`
        })
        processResponse(res);
    }
}

export default youSlice.reducer;
export const { loadedYou } = youSlice.actions;
export { checkStatus, login }