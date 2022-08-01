import { memo } from "react";
import HeaderChatArea from "./HeaderChatArea";
import { useSelector, useDispatch } from "react-redux/es/exports";
import FirstMenu from "./FirstMenu";
import { setCurrentConversationId } from "../features/chat/conversationsSlice";
import { updateContentMessageKeyword } from "../features/search/searchSlice";

function NormalHeaderChatArea({conversation}){
    const youId = useSelector(state => state.you.info.id);
    const opposideUser = conversation.participants.find((participant) => participant.id !== youId);
    const title = opposideUser.lastName + " " + opposideUser.firstName;
    const dispatch = useDispatch();
    const menu = (<FirstMenu rows={[
        {
            type: "normal",
            title: "Ẩn hội thoại",
            handleOnClick: () => {
                dispatch(setCurrentConversationId({id: null}));
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
        <HeaderChatArea avatarUrl={opposideUser.avatarUrl} title={title} status="..." menu={menu} menuSearch={menuSearch}/>
    );
}

export default memo(NormalHeaderChatArea);