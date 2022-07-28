import sendTextMessageMiddleware from "./sendTextMessage";
import loggingMiddleware from "./logging";
import sendIconMessageMiddleware from "./sendIconMessage";
import sendFileMessage from "./sendFileMessage";
import removeAmountMessageNotRead from "./removeAmountMessageNotRead";

const middleware = [sendTextMessageMiddleware, sendIconMessageMiddleware, sendFileMessage, 
    removeAmountMessageNotRead, loggingMiddleware];

export default middleware;