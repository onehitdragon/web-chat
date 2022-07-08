const signalr = require('@microsoft/signalr');

const initialState = null;

function socketReducer(state = initialState, action){
    if(action.type === "socket/buildSocket"){
        return (
            new signalr.HubConnectionBuilder()
                .withUrl('http://127.0.0.1:5001/chat')
                .build()
        );
    }
    return state;
}

export default socketReducer;