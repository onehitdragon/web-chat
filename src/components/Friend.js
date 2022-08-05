import { memo } from "react";
import { useDispatch } from "react-redux";
import { setCurrentConversationWithFriendId, updateAmountMessageNotRead } from "../features/chat/conversationsSlice";
import { callVideo } from "../features/VideoCall/videoCallSlice";
import { hideCallVideoDialog, updateCallVieoDialog } from "../features/menu/mainMenuSlice";
import BaseFriend from "./BaseFriend";
import CallVideoDialogButtonDeny from "./CallVideoDialogButtonDeny";
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
                        dispatch(updateCallVieoDialog({
                            show: true,
                            friend: friend,
                            status: "Đang gọi...",
                            buttons: [
                                <CallVideoDialogButtonDeny key={1}
                                    onHandleClick={() => { dispatch(hideCallVideoDialog()) }}/>
                            ]
                        }));
                    }
                }
            ]}/>}/>
    );
}

export default memo(Friend);