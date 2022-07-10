import { v4 as uuidv4 } from "uuid";
import { addNewMessage } from "../chat/currentConversationSlice";

const sendTextMessageMiddleware = (store) => (next) => (action) => {
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

        const currentConversation = store.getState().currentConversation;
        
        store.getState().socket.invoke('SendMessage', JSON.stringify({
            id: netId,
            idConversation: currentConversation.id,
            newMessage: newMessage
        }))
        .catch((e) => {
            console.log(e);
        });

        newMessage.netId = netId;
        
        next(addNewMessage({
            newMessage: newMessage
        }));
        
    }
    else{
        next(action);
    }
}

export default sendTextMessageMiddleware;