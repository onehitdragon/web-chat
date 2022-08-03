import { useSelector } from "react-redux"
import NormalConversation from './NormalConversation';
import { selectConversations } from "../features/chat/conversationsSlice";
import GroupConversation from "./GroupConversation";
import { memo } from "react";

function Conversations(){
    const conversations = useSelector(selectConversations);
    
    return (
        <div className="body-left__list">
            <div className="list-header">
                <span className="list-header__title">Trò Truyện</span>
                <i className="fa-solid fa-angle-down"></i>
            </div>
            {
                conversations.map((conversation) => {
                    return conversation.participants.length <= 2 ? (
                        <NormalConversation key = { conversation.id }
                            conversation = { conversation }
                        />
                    ) : (
                        <GroupConversation key = { conversation.id }
                            conversation = { conversation }
                        />
                    );
                })
            }
        </div>
    );
}

export default memo(Conversations);