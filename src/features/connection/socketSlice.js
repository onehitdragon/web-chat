import {createSlice} from "@reduxjs/toolkit";
import { addNewMessage, updateTyping } from "../chat/conversationsSlice";
import { addQuestingByOther, removeQuestingByOther, removeQuestingByYou } from "../friend/friendsSlice";

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
        },
        requestingFriend(state, action){
            state.invoke("RequestingFriend", action.payload);
            return state;
        },
        cancerRequesting(state, action){
            state.invoke("CancerRequesting", action.payload);
            return state;
        },
        denyRequesting(state, action){
            state.invoke("DenyRequesting", action.payload);
            return state;
        },
        acceptRequesting(state, action){
            state.invoke("AcceptRequesting", action.payload);
            return state;
        }
    }
});

export default socketSlice.reducer;
export const { buildSocket, requestingFriend, cancerRequesting, denyRequesting, acceptRequesting} = socketSlice.actions;

const startSocket = (whenSocketStart) => {
    return (dispatch, getState) => {
        if(getState().socket !== null){
            getState().socket.start()
            .then(() => {
                // start success
                const socket = getState().socket;
                const you = getState().you.info;
                const conversations = getState().conversations.conversations;

                socket.invoke('Init', JSON.stringify({
                    user: you,
                    listConversation: conversations
                }));
        
                socket.on("haveNewMessage", (netId, res) => {
                    const conversation = JSON.parse(res);
                    const newMessage = conversation.messages.at(-1);
                    dispatch(addNewMessage({
                        idConversation: conversation.id,
                        you: you,
                        netId: netId,
                        newMessage: newMessage
                    }));
                });
        
                socket.on("haveTyping", (res) => {
                    const data = JSON.parse(res);
                    dispatch(updateTyping({
                        idConversation: data.idConversation,
                        idUser: data.idUser,
                        typing: true
                    }));
                });
        
                socket.on("haveStopTyping", (res) => {
                    const data = JSON.parse(res);
                    dispatch(updateTyping({
                        idConversation: data.idConversation,
                        idUser: data.idUser,
                        typing: false
                    }));
                });

                socket.on("requestingFriend", (friend) => {
                    dispatch(addQuestingByOther(friend));
                });

                socket.on("cancerRequesting", (friend) => {
                    dispatch(removeQuestingByOther(friend));
                })

                socket.on("denyRequesting", (friend) => {
                    dispatch(removeQuestingByYou(friend));
                })

                socket.on("acceptRequesting", (friend) => {
                    dispatch(removeQuestingByYou(friend));
                })

                whenSocketStart();
            })
            .catch(e => {
                console.log(e);
            });
        }
    }
}

export { startSocket }