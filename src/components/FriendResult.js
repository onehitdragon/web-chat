import { memo, useState } from "react";
import BaseFriend from "./BaseFriend";
import FriendMenu from "./FriendMenu";
import { useDispatch } from "react-redux";
import { requestingFriend } from "../features/connection/socketSlice";
import { addQuestingByYou } from "../features/friend/friendsSlice";

function FriendResult({friend}){
    const dispatch = useDispatch();
    const [remove, setRemove] = useState(false);

    return (
        !remove &&
        <BaseFriend friend={friend}
            friendMenu={<FriendMenu rows={[
                {
                    title: "Kết bạn",
                    handleOnClick: () => {
                        dispatch(requestingFriend(friend));
                        setRemove(true);
                        dispatch(addQuestingByYou(friend));
                    }
                }
            ]}/>}/>
    );
}

export default memo(FriendResult);