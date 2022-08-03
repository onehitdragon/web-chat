import { memo, useState } from "react"
import { useSelector } from "react-redux";
import Friend from "./Friend";
import FriendQuestingByOther from "./FriendQuestingByOther";
import FriendQuestingByYou from "./FriendQuestingByYou";

function Friends(){
    const friends = useSelector(state => state.friends.friends);
    const questingByOthers = useSelector(state => state.friends.questingByOthers);
    const questingByYous = useSelector(state => state.friends.questingByYous);
    const [showFriends, setShowingFriends] = useState(true);
    const [showQuestingByOthers, setQuestingByOthers] = useState(true);
    const [showQuestingByYous, setQuestingByYous] = useState(true);

    return (
        <div className="body-left__list">
            <div className="list-header" onClick={() => { setShowingFriends(!showFriends) }}>
                <span className="list-header__title">Bạn bè ({friends.length})</span>
                <i className={`fa-solid fa-angle-${showFriends ? "down" : "up"}`}></i>
            </div>
            {
                showFriends &&
                friends.map((friend) => {
                    return (<Friend key={friend.id} friend={friend}/>);
                })
            }
            <div className="list-header" onClick={() => { setQuestingByOthers(!showQuestingByOthers) }}>
                <span className="list-header__title">Yêu cầu kết bạn ({questingByOthers.length})</span>
                <i className={`fa-solid fa-angle-${showQuestingByOthers ? "down" : "up"}`}></i>
            </div>
            {
                showQuestingByOthers &&
                questingByOthers.map((friend) => {
                    return (<FriendQuestingByOther key={friend.id} friend={friend}/>);
                })
            }
            <div className="list-header" onClick={() => { setQuestingByYous(!showQuestingByYous) }}>
                <span className="list-header__title">Đã gửi ({questingByYous.length})</span>
                <i className={`fa-solid fa-angle-${showQuestingByYous ? "down" : "up"}`}></i>
            </div>
            {
                showQuestingByYous && 
                questingByYous.map((friend) => {
                    return (<FriendQuestingByYou key={friend.id} friend={friend}/>);
                })
            }
        </div>
    )
}

export default memo(Friends);