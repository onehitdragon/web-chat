import { memo } from "react";
import FileContent from "./FileContent";
import BaseMessage from "./BaseMessage";

function OpposideMessage({message, displayAvatar, displayTime}){
    const opposide = message.sender;

    return (
        <BaseMessage side="left" sender={opposide} displayAvatar={displayAvatar} displayTime={displayTime}
            type={message.typeMessage}
            content={message.typeMessage === 0 ? message.content : (<FileContent  message = { message }/>)}
            createAt={message.createAt}/>
    );
}

export default memo(OpposideMessage);