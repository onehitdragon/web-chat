import loggingMiddleware from "./logging";
import sendIconMessageMiddleware from "./sendIconMessage";
import sendFileMessage from "./sendFileMessage";
import removeAmountMessageNotRead from "./removeAmountMessageNotRead";

const middleware = [sendIconMessageMiddleware, sendFileMessage, 
    removeAmountMessageNotRead, loggingMiddleware];

export default middleware;