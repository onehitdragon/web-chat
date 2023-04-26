import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentConversationId, updateAmountMessageNotRead } from "../features/chat/conversationsSlice";
import convertTimeToDisplay from "../tools/covertTimeToDisplay";
import AvatarConversation from "./AvatarConversation";
import HighLightSearchContent from "./HighLightSearchContent";
import InfoArea from "./InfoArea";
import styles from "./Home.module.css";

function BaseConversation({id, title, lastMessage, participants, amountMessageNotRead}){
    const contentLastMessage = lastMessage != null ? lastMessage.content : 'Trò chuyện ngay';
    const dispatch = useDispatch();
    const currentConversationId = useSelector(state => state.conversations.currentConversationId);
    const isChoice = id === currentConversationId;
    const keyword = useSelector(state => state.search.conversationKeyword);
    const resultTitle = title.toLowerCase().search(keyword.toLowerCase());
    const resultContentLastMessage = contentLastMessage.toLowerCase().search(keyword.toLowerCase());
    let show = true;
    if(resultTitle === -1 && resultContentLastMessage === -1){
        show = false;
    }

    const handleClickConversaion = () => {
        dispatch(setCurrentConversationId({
            id: id
        }));
        dispatch(updateAmountMessageNotRead);
    }

    return (
        show && 
        <div className={styles["list-item"] + " " + styles[(isChoice ? 'list-item--choiced' : "")]}
            onClick={ (e) => { handleClickConversaion(); } }>
            <AvatarConversation participants={participants}/>
            <InfoArea title={
                    <HighLightSearchContent content={title} startPos={resultTitle}
                        amount={keyword.length} color="red"/>
                }
                contentLastMessage={
                    <HighLightSearchContent content={contentLastMessage} startPos={resultContentLastMessage}
                        amount={keyword.length} color="blue"/>
                }
            />
            <div className={styles["status-area"]}>
                <p className={styles.time}>
                    <i className={styles["fa-solid fa-check"]}></i>
                    <span>
                        {lastMessage != null && convertTimeToDisplay(lastMessage.createAt)}
                    </span>
                </p>
                { 
                    amountMessageNotRead !== 0 &&
                    <i className={styles["fa-solid fa-circle status"]}>
                        <span>{amountMessageNotRead < 10 && amountMessageNotRead}</span>
                    </i>
                }
            </div>
        </div>
    );
}

export default memo(BaseConversation);