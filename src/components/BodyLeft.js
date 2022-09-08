import { memo } from "react";
import Conversations from "./Conversations";
import SearchBar from "./SearchBar";
import BodyLeftHeader from "./BodyLeftHeader";
import { useSelector } from "react-redux/es/exports";
import Friends from "./Friends";
import { selectCurrentConversaionId } from "../features/chat/conversationsSlice";

function BodyLeft(){
    const typeLeftContentShowing = useSelector(state => state.mainMenu.typeLeftContentShowing);
    const currentConversationId = useSelector(selectCurrentConversaionId);

    return (
        <div className="body-left">
            <div className="body-left__before"></div>
            <BodyLeftHeader />
            <SearchBar />
            {typeLeftContentShowing === "conversations" && <Conversations />}
            {typeLeftContentShowing === "friends" && <Friends />}
            {
                currentConversationId !== null &&
                <style>
                    {
                        `@media screen and (max-width: 480px){
                            .body > .body__main-home .body-left{
                                display: none;
                            }
                        }`
                    }
                </style>
            }
        </div>
    );
}

export default memo(BodyLeft);