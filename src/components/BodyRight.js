import { memo } from "react";
import ContentChatArea from './ContentChatArea';
import NormalHeaderChatArea from "./NormalHeaderChatArea";
import GroupHeaderChatArea from "./GroupHeaderChatArea";
import InputChatArea from './InputChatArea';
import { useSelector } from "react-redux";
import { selectCurrentConversaion } from "../features/chat/conversationsSlice"
import ListParticipantGroup from "./ListParticipantGroup";
import styles from "./Home.module.css";

function BodyRight(){
    const currentConversation = useSelector(selectCurrentConversaion);

    return (
        currentConversation != null &&
        <div className={styles["body-right"]}>
            <div className={styles["body-right__before"]}></div>
            {currentConversation.participants.length === 2 ?
                (<NormalHeaderChatArea conversation={currentConversation}/>) :
                (<GroupHeaderChatArea conversation={currentConversation}/>)
            }
            <ContentChatArea conversation={currentConversation}/>
            <InputChatArea />
            {currentConversation.participants.length > 2 && 
                <ListParticipantGroup creatorId={currentConversation.creatorId}
                    participants={currentConversation.participants}/>
            }
        </div>
    );
}

export default memo(BodyRight);