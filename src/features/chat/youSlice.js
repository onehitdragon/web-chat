import { createSlice } from "@reduxjs/toolkit";
import doRequestApi from "../../tools/doRequestApi";

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
        doRequestApi('/account/CheckLogined', 'GET')
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
        const res = doRequestApi('/account/login', 'POST', {
            contentType: 'application/x-www-form-urlencoded',
            body: `email=${email}&password=${password}`
        })
        processResponse(res);
    }
}

const loginGoogle = (email, name, avatar, processResponse) => {
    return (dispatch, getState) => {
        const res = doRequestApi('/account/LoginGoogle', 'POST', {
            contentType: 'application/x-www-form-urlencoded',
            body: `EmailGoogle=${email}&GoogleName=${name}&AvatarUrl=${avatar}`
        })
        processResponse(res);
    }
}

const loginFacebook = (id, name, avatar, processResponse) => {
    return (dispatch, getState) => {
        const res = doRequestApi('/account/LoginFacebook', 'POST', {
            contentType: 'application/x-www-form-urlencoded',
            body: `IdUser=${id}&FacebookName=${name}&AvatarUrl=${avatar}`
        })
        processResponse(res);
    }
}

export default youSlice.reducer;
export const { loadedYou } = youSlice.actions;
export { checkStatus, login, loginGoogle, loginFacebook}