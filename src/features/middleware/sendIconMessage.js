import { v4 as uuidv4 } from "uuid";
import { selectCurrentConversaion, addYourNewMessage } from "../chat/conversationsSlice";

const sendIconMessageMiddleware = (store) => (next) => (action) => {
    if(action.type === "sendIconMessage"){
        const netId = uuidv4();
        const newMessage = {
            content: "Đã gửi icon",
            createAt: new Date().toISOString(),
            fileAttachUrl: "/img/icons/" + action.icon,
            sender: store.getState().you,
            typeMessage: 1,
            status: 'load'
        }

        const currentConversation = selectCurrentConversaion(store.getState());

        store.getState().socket.invoke('SendMessage', JSON.stringify({
            id: netId,
            idConversation: currentConversation.id,
            newMessage: newMessage
        }))
        .catch((e) => {
            console.log(e);
        });

        newMessage.netId = netId;
        
        next(addYourNewMessage({
            newMessage: newMessage
        }));
    }
    else{
        next(action);
    }
}

export default sendIconMessageMiddleware;