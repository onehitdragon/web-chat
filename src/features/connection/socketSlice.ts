import {ThunkAction, createSlice} from "@reduxjs/toolkit";
import { addConversation, addNewMessage, updateTyping } from "../chat/conversationsSlice";
import { addFriends, addQuestingByOther, removeQuestingByOther, removeQuestingByYou } from "../friend/friendsSlice";
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { RootState } from "../../app/store";

const socketSlice = createSlice({
    name: "socket",
    initialState: null as HubConnection | null,
    reducers: {
        buildSocket(state, action: { payload: { url: string } }){
            return (
                new HubConnectionBuilder()
                    .withUrl(action.payload.url)
                    .build()
            );
        }
    }
});

export default socketSlice.reducer;
export const { buildSocket } = socketSlice.actions;

const startSocket = (whenSocketStart: Function) => {
    const thunk: ThunkAction<void, RootState, any, any> = (dispatch, getState) => {
        const socket = getState().socket;
        if(socket !== null){
            socket.start()
            .then(() => {
                // start success
                const you = getState().you.info;
                if(typeof you === "undefined") return;
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
                });

                socket.on("denyRequesting", (friend) => {
                    dispatch(removeQuestingByYou(friend));
                });

                socket.on("acceptRequesting", (friend, conversation) => {
                    if(friend.id !== you.id){
                        dispatch(removeQuestingByYou(friend));
                        dispatch(addFriends(friend));
                    }
                    dispatch(addConversation(conversation));
                });

                socket.on("createGroupConversation", (friend, conversation) => {
                    dispatch(addConversation(conversation));
                });

                whenSocketStart();
            })
            .catch(e => {
                console.log(e);
            });
        }
    }

    return thunk;
}

// function action
const requestingFriend = (friend: User) => {
    const thunk: ThunkAction<void, RootState, any, any> = (dispatch, getState) => {
        const socket = getState().socket;
        if(socket === null) return;

        socket.invoke("RequestingFriend", friend);
    }

    return thunk;
}

const cancerRequesting = (friend: User) => {
    const thunk: ThunkAction<void, RootState, any, any> = (dispatch, getState) => {
        const socket = getState().socket;
        if(socket === null) return;

        socket.invoke("CancerRequesting", friend);
    }

    return thunk;
}
const denyRequesting = (friend: User) => {
    const thunk: ThunkAction<void, RootState, any, any> = (dispatch, getState) => {
        const socket = getState().socket;
        if(socket === null) return;

        socket.invoke("DenyRequesting", friend);
    }

    return thunk;
}
const acceptRequesting = (friend: User) => {
    const thunk: ThunkAction<void, RootState, any, any> = (dispatch, getState) => {
        const socket = getState().socket;
        if(socket === null) return;

        socket.invoke("AcceptRequesting", friend);
    }

    return thunk;
}
const createGroupConversation: ThunkAction<void, RootState, any, any> = (dispatch, getState) => {
    const nameGroup = getState().createGroup.nameGroup;
    const participants = getState().createGroup.invites;
    const socket = getState().socket;
    if(socket === null) return;

    socket.invoke("CreateGroupConversation", nameGroup, participants);
}

export { startSocket, requestingFriend, cancerRequesting, denyRequesting, acceptRequesting, createGroupConversation }