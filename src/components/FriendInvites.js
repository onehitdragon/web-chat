import { memo } from "react";
import FriendInvite from "./FriendInvite";

function FriendInvites({friends}){
    return (
        <div className="list-added">
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