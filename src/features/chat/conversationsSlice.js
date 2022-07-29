import { createSelector, createSlice } from "@reduxjs/toolkit";
import doRequestApi from "../../tools/doRequestApi";
import { loadedYou } from "./youSlice";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytes } from "firebase/storage";
import checkFileType from "../../tools/checkFileType";

const conversationsSlice = createSlice({
    initialState: {
        conversations: null,
        currentConversationId: null
    },
    name: "conversations",
    reducers: {
        loadedConversations: (state, action) => {
            state.conversations = action.payload;
        },
        setCurrentConversationId: (state, action) => {
            state.currentConversationId = action.payload.id;
        },
        setScroll: (state, action) => {
            state.conversations.find((conversation) => {
                if(conversation.id === state.currentConversationId){
                    conversation.scroll = action.payload;
                    return true;
                }
                return false;
            });
        },
        addYourNewMessage: (state, action) => {
            const currentConversation = findCurrentConversation(state.conversations, state.currentConversationId);
            currentConversation.scroll = undefined;
            currentConversation.messages.push(action.payload);
        },
        addNewMessage: (state, action) => {
            let conversationFound = state.conversations.find(conversation => conversation.id === action.payload.idConversation);
            const newMessage = action.payload.newMessage;
            const you = action.payload.you;
            const sender = newMessage.sender;
            if(sender.id === you.id){
                const justSentMessage = conversationFound.messages.find((message) => {
                    if(message.netId === action.payload.netId){
                        // replace
                        message.id = newMessage.id;
                        message.status = "success";
                        return true;
                    }
                    return false;
                });
                if(justSentMessage === undefined){
                    conversationFound.messages.push({...newMessage, status: "success"});
                }
            }
            else{
                const result = conversationFound.messages.find((message, index) => {
                    if(message.status === "load"){
                        // insert before
                        conversationFound.messages.splice(index, 0, newMessage);
                        return true;
                    }
                    return false;
                });
                if(result === undefined){
                    conversationFound.messages.push(newMessage);
                }
                if(conversationFound.scroll !== undefined){
                    conversationFound.scroll = -1;
                }
                conversationFound.amountMessageNotRead += 1;
            }
        },
        removeAmountMessageNotRead: (state, action) => {
            const currentConversation = findCurrentConversation(state.conversations, state.currentConversationId);
            if(currentConversation.amountMessageNotRead > 0){
                currentConversation.amountMessageNotRead = 0;
            }
        },
        updateTyping: (state, action) => {
            const conversationFound = state.conversations.find(conversation => conversation.id === action.payload.idConversation);
            const participants = conversationFound.participants;
            participants.find(participant => {
                if(participant.id === action.payload.idUser){
                    participant.typing = action.payload.typing;
                    return true;
                }
                return false;
            });
            conversationFound.scroll = -1;
        },
        updateStateFileMessage: (state, action) => {
            const currentConversation = findCurrentConversation(state.conversations, state.currentConversationId);
            const messages = currentConversation.messages;
            messages.find(message => {
                if(message.id === action.payload.idMessage){
                    message.typeFile = action.payload.typeFile; 
                    message.src = action.payload.src;
                    message.loaded = action.payload.loaded;
                    return true;
                }
                return false;
            });
        }
    }
});

function findCurrentConversation(conversations, currentConversationId){
    return conversations.find(conversation => conversation.id === currentConversationId);
}

export default conversationsSlice.reducer;
export const { loadedConversations, setCurrentConversationId, setScroll, addYourNewMessage,
    haveNewMessage, addNewMessage, removeAmountMessageNotRead, updateTyping, updateStateFileMessage}
    = conversationsSlice.actions;

const selectConversations = (state) => state.conversations.conversations;
const selectCurrentConversaionId = (state) => state.conversations.currentConversationId;
const selectCurrentConversaion = createSelector(
    selectConversations,
    selectCurrentConversaionId,
    findCurrentConversation
);

export { selectConversations, selectCurrentConversaionId, selectCurrentConversaion };

// actions function
const loadConversaions = (whenLoaded) => {
    return (dispatch, getState) => {
        doRequestApi('http://127.0.0.1:5001/home/index', 'GET')
        .then((data) => {
            console.log(data);
            dispatch(loadedYou(data.you));
            dispatch(loadedConversations(data.listConversation));
            whenLoaded();
        })
    }
}
const sendTextMessage = (content) => {
    return (dispatch, getState) => {
        const netId = uuidv4();
        const newMessage = {
            content: content,
            createAt: new Date().toISOString(),
            fileAttachUrl: "",
            sender: getState().you.info,
            typeMessage: 0,
            status: 'load'
        }
        getState().socket.invoke('SendMessage', JSON.stringify({
            id: netId,
            idConversation: getState().conversations.currentConversationId,
            newMessage: newMessage
        }))
        .catch((e) => {
            console.log(e);
        });
        newMessage.netId = netId;
        dispatch(addYourNewMessage(newMessage));
    }
}
const sendIconMessage = (iconName) => {
    return (dispatch, getState) => {
        const netId = uuidv4();
        const newMessage = {
            content: "Đã gửi icon",
            createAt: new Date().toISOString(),
            fileAttachUrl: "/img/icons/" + iconName,
            sender: getState().you.info,
            typeMessage: 1,
            status: 'load'
        }
        getState().socket.invoke('SendMessage', JSON.stringify({
            id: netId,
            idConversation: getState().conversations.currentConversationId,
            newMessage: newMessage
        }))
        .catch((e) => {
            console.log(e);
        });
        newMessage.netId = netId;
        dispatch(addYourNewMessage(newMessage));
    }
}
const sendFileMessage = (file) => {
    return (dispatch, getState) => {
        // size < 50mb
        if(file.size > 50000000){
            console.log("file too large");
            return;
        }

        const netId = uuidv4();
        const type = checkFileType(file.name);
        let folderStorage;
        if(type === "image"){
            folderStorage = "/image/";
        }
        if(type === "music"){
            folderStorage = "/music/";
        }
        if(type === "video"){
            folderStorage = "/video/";
        }
        const fileName = folderStorage + netId + "-name-" + file.name;
        const storageFireBase = getState().storageFireBase;
        const storageRef = ref(storageFireBase, fileName);
        uploadBytes(storageRef, file)
        .then(res => {
            console.log("success upload file to fire base");
            const newMessage = {
                content: "Đã gửi file",
                createAt: new Date().toISOString(),
                fileAttachUrl: fileName,
                sender: getState().you.info,
                typeMessage: 1,
                status: 'load'
            }
            getState().socket.invoke('SendMessage', JSON.stringify({
                id: netId,
                idConversation: getState().conversations.currentConversationId,
                newMessage: newMessage
            }))
            .catch((e) => {
                console.log(e);
            });
            newMessage.netId = netId;
            dispatch(addYourNewMessage(newMessage));
        })
        .catch((e) => {
            console.log(e);
        });
    }
}
const updateAmountMessageNotRead = (dispatch, getState) => {
    const currentConversation = selectCurrentConversaion(getState());
    const you = getState().you.info;
    if(currentConversation.amountMessageNotRead > 0){
        doRequestApi('http://127.0.0.1:5001/home/UpdateAmountMessageNotRead', 'PUT', {
            contentType: 'application/x-www-form-urlencoded',
            body: `idConversation=${currentConversation.id}&idUser=${you.id}`
        })
        .then(data => {
            console.log(data);
        })
        dispatch(removeAmountMessageNotRead());
    }
}

export { loadConversaions, sendTextMessage, sendIconMessage, sendFileMessage, updateAmountMessageNotRead }