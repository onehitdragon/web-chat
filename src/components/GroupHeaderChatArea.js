import { memo } from "react";
import HeaderChatArea from "./HeaderChatArea";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowParticipants } from "../features/setting/groupConversationSettingSlice";
import FirstMenu from "./FirstMenu";

function GroupHeaderChatArea({conversation}){
    const dispatch = useDispatch();
    const isShowParticipants = useSelector(state => state.groupConversationSetting.isShowParticipants);
    const [menu] = useState(<FirstMenu rows={[
        {
            type: "normal",
            title: "Ẩn hội thoại",
            handleOnClick: () => {
                
            }
        },
        {
            type: "checkbox",
            title: "Hiển thị thành viên",
            checked: isShowParticipants,
            handleOnClick: () => {
                dispatch(toggleShowParticipants());
            }
        }
    ]}/>);

    return (
        <HeaderChatArea title={conversation.title} status={conversation.participants.length + " thành viên"}
            type={"group"} menu={menu}/>
    );
}

export default memo(GroupHeaderChatArea);