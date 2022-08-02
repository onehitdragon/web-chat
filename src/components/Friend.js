import { memo } from "react";
import { useSelector } from "react-redux";
import HighLightSearchContent from "./HighLightSearchContent";

function Friend({friend}){
    const keyword = useSelector(state => state.search.conversationKeyword);
    const name = friend.lastName + " " + friend.firstName;
    const result = name.toLowerCase().search(keyword.toLowerCase());
    let show = true;
    if(result === -1){
        show = false;
    }

    return (
        show &&
        <div className="list-item">
            <div className="avatar-area">
                <img className="avatar" src={friend.avatarUrl} alt="error"/>
                <i className="fa-solid fa-circle icon-status--green"></i>
            </div>
            <div className="info-area info-area--friend">
                <div className="name">
                    <HighLightSearchContent content={name} startPos={result} amount={keyword.length} color="red"/>
                </div>
                <div className="friends">
                    <div className="friend">
                        <span>Nhắn tin</span>
                    </div>
                    <div className="friend friend--call">
                        <span>Gọi</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(Friend);