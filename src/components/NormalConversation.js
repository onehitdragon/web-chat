import { memo } from "react";
import { useSelector } from "react-redux";
import BaseConversation from "./BaseConversation";

function NormalConversation({conversation}){
    const youId = useSelector(state => state.you.info.id);
    const opposideUser = conversation.participants.find((participant) => participant.id !== youId);
    const title = opposideUser.lastName + " " + opposideUser.firstName;

    return (
        <BaseConversation id={conversation.id}
            title={title}
            lastMessage={conversation.messages.at(-1)}
            amountMessageNotRead={conversation.amountMessageNotRead}
        />
    );
}

export default memo(NormalConversation);