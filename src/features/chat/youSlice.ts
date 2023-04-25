import { ThunkAction, createSlice } from "@reduxjs/toolkit";
import doRequestApi from "../../tools/doRequestApi";
import { RootState } from "../../app/store";
import z from "zod";

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

const checkStatus = (doLogin: Function, doNotLogin: Function) => {
    const thunk: ThunkAction<void, RootState, any, any> = (dispatch, getState) => {
        doRequestApi<{logined: boolean}>('/account/CheckLogined', 'GET')
        .then((data) => {
            if(data.logined){
                doLogin();
            }
            else{
                doNotLogin();
            }
        })
    }

    return thunk;
}

const loginSchema = z.union([
    z.object({
        isSuccess: z.string(),
        nextUrl: z.string()
    }),
    z.object({
        errorConnection: z.boolean()
    })
]);
type LoginResponse = z.infer<typeof loginSchema>;

const login = (email: string, password: string, processResponse: (res: Promise<LoginResponse>) => any) => {
    const thunk: ThunkAction<void, RootState, any, any> = (dispatch, getState) => {
        const res = doRequestApi<LoginResponse>('/account/login', 'POST', {
            contentType: 'application/x-www-form-urlencoded',
            body: `email=${email}&password=${password}`
        });
        processResponse(res);
    }

    return thunk;
}

const loginGoogle = (email: string, name: string, avatar: string, processResponse: (res: Promise<unknown>) => any) => {
    const thunk: ThunkAction<void, RootState, any, any> = (dispatch, getState) => {
        const res = doRequestApi('/account/LoginGoogle', 'POST', {
            contentType: 'application/x-www-form-urlencoded',
            body: `EmailGoogle=${email}&GoogleName=${name}&AvatarUrl=${avatar}`
        })
        processResponse(res);
    }

    return thunk;
}

const loginFacebook = (id: string, name: string, avatar: string, processResponse: (res: Promise<unknown>) => any) => {
    const thunk: ThunkAction<void, RootState, any, any> = (dispatch, getState) => {
        const res = doRequestApi('/account/LoginFacebook', 'POST', {
            contentType: 'application/x-www-form-urlencoded',
            body: `IdUser=${id}&FacebookName=${name}&AvatarUrl=${avatar}`
        })
        processResponse(res);
    }

    return thunk;
}

export default youSlice.reducer;
export const { loadedYou } = youSlice.actions;
export { checkStatus, login, loginGoogle, loginFacebook}