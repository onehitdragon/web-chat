import { memo } from "react";
import { useDispatch } from "react-redux";
import { cancerRequesting } from "../features/connection/socketSlice";
import { removeQuestingByYou } from "../features/friend/friendsSlice";
import BaseFriend from "./BaseFriend";
import FriendMenu from "./FriendMenu";

function FriendQuestingByYou({friend}){
    const dispatch = useDispatch();

    return (
        <BaseFriend friend={friend}
            friendMenu={<FriendMenu rows={[
                {
                    title: "Huỷ gửi",
                    handleOnClick(){
                        dispatch(removeQuestingByYou(friend));
                        dispatch(cancerRequesting(friend));
                    }
                }
            ]}/>}/>
    );
}

export default memo(FriendQuestingByYou);