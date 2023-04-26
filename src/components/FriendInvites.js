import { memo } from "react";
import FriendInvite from "./FriendInvite";
import styles from "./Home.module.css";

function FriendInvites({friends}){
    return (
        <div className={styles["list-added"]}>
            {
                friends.map((friend) => {
                    return (
                        <FriendInvite key={friend.id} friend={friend}/>
                    );
                })
            }
        </div>
    );
}

export default memo(FriendInvites);