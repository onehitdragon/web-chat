import { memo } from "react";

function NormalConversation({infoConversation, lastMessage, you, setCurrentConversation, isChoice}){
    // const opposideUser = infoConversation.participants.find((participant) => participant.id !== you.id);

    return (
        <div className={'conversation-item ' + (isChoice && 'conversation-item--choiced')}
            onClick={ () => { setCurrentConversation(infoConversation) } }>
            <div className="avatar-area">
                <img className="avatar" src="https://cdn4.iconfinder.com/data/icons/game-of-thrones-4/64/game_of_thrones_game_thrones_series_character_avatar_ice_dragon-512.png" alt="error"/>
                <i className="fa-solid fa-circle icon-status--green"></i>
            </div>
            <div className="info-area">
                <p className="name">{infoConversation.title}</p>
                <p className="last-mes">{lastMessage != null ? lastMessage.content : 'Trò chuyện ngay'}</p>
            </div>
            <div className="status-area">
                <p className="time">
                    <i className="fa-solid fa-check"></i>
                    <span></span>
                </p>
            </div>
        </div>
    );
}

export default memo(NormalConversation);