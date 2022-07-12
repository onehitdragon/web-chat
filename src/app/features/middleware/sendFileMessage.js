import { v4 as uuidv4 } from "uuid";
import { selectCurrentConversaion, addYourNewMessage } from "../chat/conversationsSlice";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const sendFileMessage = (store) => (next) => (action) => {
    if(action.type === "sendFileMessage"){
        const file = action.file;
        // size < 10mb
        if(file.size > 10000000){
            console.log("file too large");
            return;
        }
        const netId = uuidv4();
        const fileName = "/image/" + netId + "-name-" + file.name;
        const storageFireBase = store.getState().storageFireBase;
        const storageRef = ref(storageFireBase, fileName);
        console.log(fileName);
        console.log(storageFireBase);
        uploadBytes(storageRef, file)
        .then(res => {
            console.log("success upload file to fire base");
            const newMessage = {
                content: "Đã gửi file",
                createAt: new Date().toISOString(),
                fileAttachUrl: fileName,
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
        })
        .catch((e) => {
            console.log(e);
        });
    }
    else{
        next(action);
    }
}

export default sendFileMessage;