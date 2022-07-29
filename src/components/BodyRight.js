import { memo } from "react";
import ContentChatArea from './ContentChatArea';
import HeaderChatArea from './HeaderChatArea';
import InputChatArea from './InputChatArea';
import { useSelector } from "react-redux";
import { selectCurrentConversaion } from "../features/chat/conversationsSlice"

function BodyRight(){
    const currentConversation = useSelector(selectCurrentConversaion);

    return (
        currentConversation != null &&
        <div className="body-right">
            <div className="body-right__before"></div>
            <HeaderChatArea title={currentConversation.title} />
            <ContentChatArea />
            <InputChatArea />
        </div>
    );
}

export default memo(BodyRight);