import { memo } from "react";
import ContentChatArea from './ContentChatArea';
import NormalHeaderChatArea from "./NormalHeaderChatArea";
import GroupHeaderChatArea from "./GroupHeaderChatArea";
import InputChatArea from './InputChatArea';
import { useSelector } from "react-redux";
import { selectCurrentConversaion } from "../features/chat/conversationsSlice"

function BodyRight(){
    const currentConversation = useSelector(selectCurrentConversaion);

    return (
        currentConversation != null &&
        <div className="body-right">
            <div className="body-right__before"></div>
            {currentConversation.participants.length === 2 ?
                (<NormalHeaderChatArea conversation={currentConversation}/>) :
                (<GroupHeaderChatArea conversation={currentConversation}/>)
            }
            <ContentChatArea conversation={currentConversation}/>
            <InputChatArea />
        </div>
    );
}

export default memo(BodyRight);