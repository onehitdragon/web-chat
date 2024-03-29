import { memo } from "react";
import HeaderChatArea from "./HeaderChatArea";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowParticipants } from "../features/setting/groupConversationSettingSlice";
import FirstMenu from "./FirstMenu";
import { setCurrentConversationId } from "../features/chat/conversationsSlice";
import { updateContentMessageKeyword } from "../features/search/searchSlice";

function GroupHeaderChatArea({conversation}){
    const dispatch = useDispatch();
    const isShowParticipants = useSelector(state => state.groupConversationSetting.isShowParticipants);
    const menu = (<FirstMenu rows={[
        {
            type: "normal",
            title: "Ẩn hội thoại",
            handleOnClick: () => {
                dispatch(setCurrentConversationId({id: null}));
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
    const contentMessageKeyword = useSelector(state => state.search.contentMessageKeyword);
    const menuSearch = (<FirstMenu rows={[
        {
            type: "input",
            placeholder: "Nhập nội dung...",
            value: contentMessageKeyword,
            handleOnInput: (inputValue) => {
                dispatch(updateContentMessageKeyword(inputValue));
            }
        }
    ]}/>);

    return (
        <HeaderChatArea title={conversation.title} status={conversation.participants.length + " thành viên"}
            type={"group"} menu={menu} menuSearch={menuSearch}/>
    );
}

export default memo(GroupHeaderChatArea);