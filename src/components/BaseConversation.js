import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentConversationId, updateAmountMessageNotRead } from "../features/chat/conversationsSlice";
import convertTimeToDisplay from "../tools/covertTimeToDisplay";

function BaseConversation({id, title, lastMessage, amountMessageNotRead}){
    const dispatch = useDispatch();
    const currentConversationId = useSelector(state => state.conversations.currentConversationId);
    const isChoice = id === currentConversationId;

    const handleClickConversaion = () => {
        dispatch(setCurrentConversationId({
            id: id
        }));
        dispatch(updateAmountMessageNotRead);
    }

    return (
        <div className={'conversation-item ' + (isChoice && 'conversation-item--choiced')}
            onClick={ () => { handleClickConversaion(); } }>
            <div className="avatar-area">
                <img className="avatar" src="https://cdn4.iconfinder.com/data/icons/game-of-thrones-4/64/game_of_thrones_game_thrones_series_character_avatar_ice_dragon-512.png" alt="error"/>
                <i className="fa-solid fa-circle icon-status--green"></i>
            </div>
            <div className="info-area">
                <p className="name">{title}</p>
                <p className="last-mes">{lastMessage != null ? lastMessage.content : 'Trò chuyện ngay'}</p>
            </div>
            <div className="status-area">
                <p className="time">
                    <i className="fa-solid fa-check"></i>
                    <span>
                        {lastMessage != null && convertTimeToDisplay(lastMessage.createAt)}
                    </span>
                </p>
                { 
                    amountMessageNotRead !== 0 &&
                    <i className="fa-solid fa-circle status">
                        <span>{amountMessageNotRead < 10 && amountMessageNotRead}</span>
                    </i>
                }
            </div>
        </div>
    );
}

export default memo(BaseConversation);