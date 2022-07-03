import { useState } from "react";

function NormalConversation({infoConversation, you}){
    const opposideUser = infoConversation.participants.find((participant) => participant.id !== you.id);
    const [currentMessage, setCurrentMessage] = useState(infoConversation.messages.at(-1));

    return (
        <div className="conversation-item">
            <div className="avatar-area">
                <img className="avatar" src="https://cdn4.iconfinder.com/data/icons/game-of-thrones-4/64/game_of_thrones_game_thrones_series_character_avatar_ice_dragon-512.png" alt="error"/>
                <i className="fa-solid fa-circle icon-status--green"></i>
            </div>
            <div className="info-area">
                <p className="name">{infoConversation.title}</p>
                <p className="last-mes">{currentMessage != null ? currentMessage.content : 'Chưa có tin nhắn'}</p>
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

export default NormalConversation;