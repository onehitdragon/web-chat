import { memo } from "react";
import FriendResult from "./FriendResult";

function FriendResults({friends}){
    return (
        <div className="list-search">
            <div className="body-left__list">
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