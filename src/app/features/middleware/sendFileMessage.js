import { v4 as uuidv4 } from "uuid";
import { selectCurrentConversaion, addYourNewMessage } from "../chat/conversationsSlice";
import { ref, uploadBytes } from "firebase/storage";
import checkFileType from "../../../tools/checkFileType";

const sendFileMessage = (store) => (next) => (action) => {
    if(action.type === "sendFileMessage"){
        const file = action.file;
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