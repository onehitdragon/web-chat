import initStateMiddleware from "./initState";
import sendTextMessageMiddleware from "./sendTextMessage";
import loggingMiddleware from "./logging";
import sendIconMessageMiddleware from "./sendIconMessage";
import sendFileMessage from "./sendFileMessage";

const middleware = [initStateMiddleware, sendTextMessageMiddleware, sendIconMessageMiddleware, sendFileMessage, loggingMiddleware];

export default middleware;