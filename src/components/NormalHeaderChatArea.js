import { memo, useState } from "react";
import HeaderChatArea from "./HeaderChatArea";
import { useSelector, useDispatch } from "react-redux/es/exports";
import FirstMenu from "./FirstMenu";
import { setCurrentConversationId } from "../features/chat/conversationsSlice";

function NormalHeaderChatArea({conversation}){
    const youId = useSelector(state => state.you.info.id);
    const opposideUser = conversation.participants.find((participant) => participant.id !== youId);
    const title = opposideUser.lastName + " " + opposideUser.firstName;
    const dispatch = useDispatch();
    const [menu] = useState(<FirstMenu rows={[
        {
            type: "normal",
            title: "Ẩn hội thoại",
            handleOnClick: () => {
                dispatch(setCurrentConversationId({id: null}));
            }
        }
    ]}/>);

    return (
        <HeaderChatArea avatarUrl={opposideUser.avatarUrl} title={title} status="..." menu={menu}/>
    );
}

export default memo(NormalHeaderChatArea);