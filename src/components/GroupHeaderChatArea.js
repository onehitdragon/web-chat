import { memo } from "react";
import HeaderChatArea from "./HeaderChatArea";

function GroupHeaderChatArea({conversation}){
    return (
        <HeaderChatArea title={conversation.title} status={conversation.participants.length + " thành viên"}
            bgColor={"group"}/>
    );
}

export default memo(GroupHeaderChatArea);