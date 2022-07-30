import { memo } from "react";
import { useSelector } from "react-redux";

function ListParticipantGroup({creatorId, participants}){
    const isShowParticipants = useSelector(state => state.groupConversationSetting.isShowParticipants);
    if(!isShowParticipants) return null;
    const listParticipantElement = participants.map((participant) => {
        return (
            <div key={participant.id} className="list-participant__item">
                <div className="avatar-area">
                    <img className="avatar" src="https://cdn4.iconfinder.com/data/icons/game-of-thrones-4/64/game_of_thrones_game_thrones_series_character_avatar_ice_dragon-512.png" alt="error"/>
                    <i className="fa-solid fa-circle icon-status--green"></i>
                </div>
                <div className="name-area">
                    <span>{participant.lastName + " " + participant.firstName}</span>
                    {participant.id === creatorId && <i className="fa-solid fa-crown" title="This is controller"></i>}
                </div>
            </div>
        );
    });

    return (
        <div className="body-right__list-participant">
            <div className="list-participant">
                <div className="list-participant__item-title">
                    <span>Thành viên</span>
                </div>
                {listParticipantElement}
            </div>
        </div>
    );
}

export default memo(ListParticipantGroup);