import { memo } from "react";
import FriendResult from "./FriendResult";
import styles from "./Home.module.css"

function FriendResults({friends}){
    return (
        <div className={styles["list-search"]}>
            <div className={styles["body-left__list"]}>
                {
                    friends.map((friend) => {
                        return <FriendResult key={friend.id} friend={friend}/>
                    })
                }
            </div>
        </div>
    );
}

export default memo(FriendResults);