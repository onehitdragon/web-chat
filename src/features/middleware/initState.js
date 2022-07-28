import doRequestApi from "../../../tools/doRequestApi";
import { initConversations } from "../chat/conversationsSlice";

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
                next(initConversations({
                    conversations: data.listConversation,
                    currentConversationId: undefined
                }));
            }
        })
        .catch((e) => {
            console.log(e);
        }); 
    }
    else{
        next(action);
    }
}



export default initStateMiddleware;