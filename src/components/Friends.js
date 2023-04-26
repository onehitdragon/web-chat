import { memo, useState } from "react"
import { useSelector } from "react-redux";
import Friend from "./Friend";
import FriendQuestingByOther from "./FriendQuestingByOther";
import FriendQuestingByYou from "./FriendQuestingByYou";
import styles from "./Home.module.css";

function Friends(){
    const friends = useSelector(state => state.friends.friends);
    const questingByOthers = useSelector(state => state.friends.questingByOthers);
    const questingByYous = useSelector(state => state.friends.questingByYous);
    const [showFriends, setShowingFriends] = useState(true);
    const [showQuestingByOthers, setQuestingByOthers] = useState(true);
    const [showQuestingByYous, setQuestingByYous] = useState(true);

    return (
        <div className={styles["body-left__list"]}>
            <div className={styles["list-header"]} onClick={() => { setShowingFriends(!showFriends) }}>
                <span className={styles["list-header__title"]}>Bạn bè ({friends.length})</span>
                <i className={`fa-solid fa-angle-${showFriends ? "down" : "up"}`}></i>
            </div>
            {
                showFriends &&
                friends.map((friend) => {
                    return (<Friend key={friend.id} friend={friend}/>);
                })
            }
            <div className={styles["list-header"]} onClick={() => { setQuestingByOthers(!showQuestingByOthers) }}>
                <span className={styles["list-header__title"]}>Yêu cầu kết bạn ({questingByOthers.length})</span>
                <i className={`fa-solid fa-angle-${showQuestingByOthers ? "down" : "up"}`}></i>
            </div>
            {
                showQuestingByOthers &&
                questingByOthers.map((friend) => {
                    return (<FriendQuestingByOther key={friend.id} friend={friend}/>);
                })
            }
            <div className={styles["list-header"]} onClick={() => { setQuestingByYous(!showQuestingByYous) }}>
                <span className={styles["list-header__title"]}>Đã gửi ({questingByYous.length})</span>
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