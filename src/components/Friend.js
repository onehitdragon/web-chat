import { memo } from "react";
import { useDispatch } from "react-redux";
import { setCurrentConversationWithFriendId, updateAmountMessageNotRead } from "../features/chat/conversationsSlice";
import { callVideo } from "../features/VideoCall/videoCallSlice";
import BaseFriend from "./BaseFriend";
import FriendMenu from "./FriendMenu";

function Friend({friend}){
    const dispatch = useDispatch();
    const handleOnTalkClick = () => {
        dispatch(setCurrentConversationWithFriendId(friend.id));
        dispatch(updateAmountMessageNotRead);
    }

    return (
        <BaseFriend friend={friend}
            friendMenu={<FriendMenu rows={[
                {
                    title: "Nhắn tin",
                    handleOnClick: handleOnTalkClick
                },
                {
                    title: "Gọi",
                    handleOnClick: () => {
                        dispatch(callVideo(friend));
                    }
                }
            ]}/>}/>
    );
}

export default memo(Friend);