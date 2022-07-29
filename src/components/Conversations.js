import { useSelector } from "react-redux"
import NormalConversation from './NormalConversation';
import { selectConversations } from "../features/chat/conversationsSlice";
import GroupConversation from "./GroupConversation";
import { memo } from "react";

function Conversations(){
    const youId = useSelector(state => state.you.info.id);
    const conversations = useSelector(selectConversations);
    
    return (
        conversations.map((conversation) => {
            return conversation.participants.length <= 2 ? (
                <NormalConversation key = { conversation.id }
                    conversation = { conversation }
                    lastMessage = { conversation.messages.at(-1) }
                    youId = { youId }
                    amountMessageNotRead = { conversation.amountMessageNotRead }
                />
            ) : (
                <GroupConversation key = { conversation.id }
                infoConversation = { conversation }
                />
            );
        })
    );
}

export default memo(Conversations);