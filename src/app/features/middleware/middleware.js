import doRequestApi from "../../../tools/doRequestApi";
import { v4 as uuidv4 } from "uuid";

const initStateMiddleware = (store) => (next) => (action) => {
    if(action.type === "initState"){
        console.log("make api");
        doRequestApi('http://127.0.0.1:5001/home/index', 'GET')
        .then((data) => {
            if(data.error === "nologin"){
                store.dispatch({
                    type: "login/updateStatus",
                    status: data.error
                });
            }
            else{
                next({
                    type: "socket/buildSocket"
                });
                next({
                    type: "login/updateStatus",
                    status: "logined"
                });
                next({
                    type: "you/updateYou",
                    you: data.you
                });
                next({
                    type: "conversations/initConversaions",
                    conversations: data.listConversation
                });
            }
        })
        .catch((e) => {
            console.log(e);
        }); 
    }
    if(action.type === "sendTextMessage"){
        const netId = uuidv4();
        const newMessage = {
            content: action.content,
            createAt: new Date().toISOString(),
            fileAttachUrl: "",
            sender: store.getState().you,
            typeMessage: 0,
            status: 'load'
        }
        const currentConversation = action.currentConversation;
        store.getState().socket.invoke('SendMessage', JSON.stringify({
            id: netId,
            idConversation: currentConversation.id,
            newMessage: newMessage
        }))
        .catch((e) => {
            console.log(e);
        });
        newMessage.netId = netId;
        currentConversation.messages.push(newMessage);
        next({
            type: "conversations/updateConversaions"
        });
    }
    else{
        next(action);
    }
}

const loggingMiddleware = (store) => (next) => (action) => {
    console.log(action);
    next(action);
}

export { initStateMiddleware, loggingMiddleware};