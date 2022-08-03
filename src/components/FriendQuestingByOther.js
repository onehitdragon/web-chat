import { memo } from "react";
import { useDispatch } from "react-redux";
import { acceptRequesting, denyRequesting } from "../features/connection/socketSlice";
import { addFriends, removeQuestingByOther } from "../features/friend/friendsSlice";
import BaseFriend from "./BaseFriend";
import FriendMenu from "./FriendMenu";

function FriendQuestingByOther({friend}){
    const dispatch = useDispatch();

    return (
        <BaseFriend friend={friend}
            friendMenu={<FriendMenu rows={[
                {
                    title: "Chấp nhận",
                    handleOnClick(){
                        dispatch(addFriends(friend));
                        dispatch(removeQuestingByOther(friend));
                        dispatch(acceptRequesting(friend));
                    }
                },
                {
                    title: "Từ chối",
                    handleOnClick(){
                        dispatch(removeQuestingByOther(friend));
                        dispatch(denyRequesting(friend));
                    }
                }
            ]}/>}/>
    );
}

export default memo(FriendQuestingByOther);