import { memo } from "react";
import BaseMessage from "./BaseMessage";
import FileContent from "./FileContent";

function MyMessage({message, displayAvatar, displayTime}){
    const you = message.sender;
    const status = message.status;

    return (
        <BaseMessage side="right" sender={you} status={status} displayAvatar={displayAvatar} displayTime={displayTime}
            type={message.typeMessage}
            content={message.typeMessage === 0 ? message.content : (<FileContent  message = { message }/>)}
            createAt={message.createAt}/>
    );
}

export default memo(MyMessage);