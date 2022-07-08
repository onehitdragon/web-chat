const initialState = {
    loginStatus: "nochecked"
};

function loginReducer(state = initialState, action){
    if(action.type === "login/updateStatus"){
        return {
            ...state,
            loginStatus: action.status
        }
    }
    return state;
}

export default loginReducer;