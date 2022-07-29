import { memo } from "react";
import BaseConversation from "./BaseConversation";

function GroupConversation({conversation}){

    return (
        <BaseConversation id={conversation.id}
            title={conversation.title}
            lastMessage={conversation.messages.at(-1)}
            amountMessageNotRead={conversation.amountMessageNotRead}
        />
    );
}

export default memo(GroupConversation);