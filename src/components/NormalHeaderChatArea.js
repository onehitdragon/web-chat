import { memo } from "react";
import HeaderChatArea from "./HeaderChatArea";
import { useSelector } from "react-redux/es/exports";

function NormalHeaderChatArea({conversation}){
    const youId = useSelector(state => state.you.info.id);
    const opposideUser = conversation.participants.find((participant) => participant.id !== youId);
    const title = opposideUser.lastName + " " + opposideUser.firstName;

    return (
        <HeaderChatArea avatarUrl={opposideUser.avatarUrl} title={title} status="..."/>
    );
}

export default memo(NormalHeaderChatArea);