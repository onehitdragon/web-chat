import doRequestApi from "../../../tools/doRequestApi";
import { selectCurrentConversaion, removeAmountMessageNotRead} from "../chat/conversationsSlice";

const removeAmountMessageNotReadMiddleware = (store) => (next) => (action) => {
    if(action.type === "removeAmountMessageNotRead"){
        const currentConversation = selectCurrentConversaion(store.getState());
        const you = store.getState().you;
        if(currentConversation.amountMessageNotRead > 0){
            doRequestApi('http://127.0.0.1:5001/home/UpdateAmountMessageNotRead', 'PUT', {
                contentType: 'application/x-www-form-urlencoded',
                body: `idConversation=${currentConversation.id}&idUser=${you.id}`
            })
            .then(data => {
                console.log(data);
            })
            next(removeAmountMessageNotRead());
        }
    }
    else{
        next(action);
    }
}

export default removeAmountMessageNotReadMiddleware;