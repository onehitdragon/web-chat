import { memo } from "react";
import { useSelector } from "react-redux";

function AvatarConversation({participants}){
    const amountParticipant = participants.length;
    const youId = useSelector(state => state.you.info.id);
    const youAvatarUrl = useSelector(state => state.you.info.avatarUrl);
    let avatar;
    if(amountParticipant === 2){
        const opposideUser = participants.find((participant) => participant.id !== youId);
        avatar = <img className="avatar" src={opposideUser.avatarUrl} alt="error"/>
    }
    else{
        avatar = [];
        avatar.push(<img key={youId} className="avatar" src={youAvatarUrl} alt="error"/>);
        for(let i = 0, k = 0; i < amountParticipant; i++){
            if(participants[i].id === youId) continue;
            if(k === 4) break;
            avatar.push(<img key={participants[i].id} className="avatar" src={participants[i].avatarUrl} alt="error"/>);
            k++;
        }
    }

    return (
        <div className={"avatar-area" + (amountParticipant > 2 ? " group--avatar" : "")}>
            {avatar}
            {amountParticipant === 2 && <i className="fa-solid fa-circle icon-status--green"></i>}
        </div>
    );
}

export default memo(AvatarConversation);