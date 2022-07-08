import initStateMiddleware from "./initState";
import sendTextMessageMiddleware from "./sendTextMessage";
import loggingMiddleware from "./logging";
import sendIconMessageMiddleware from "./sendIconMessage";

const middleware = [initStateMiddleware, sendTextMessageMiddleware, sendIconMessageMiddleware, loggingMiddleware];

export default middleware;