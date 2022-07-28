import sendFileMessage from "./sendFileMessage";
import removeAmountMessageNotRead from "./removeAmountMessageNotRead";

const middleware = [sendFileMessage, 
    removeAmountMessageNotRead];

export default middleware;