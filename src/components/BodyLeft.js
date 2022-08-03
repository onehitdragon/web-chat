import { memo } from "react";
import Conversations from "./Conversations";
import SearchBar from "./SearchBar";
import BodyLeftHeader from "./BodyLeftHeader";
import { useSelector } from "react-redux/es/exports";
import Friends from "./Friends";

function BodyLeft(){
    const typeLeftContentShowing = useSelector(state => state.mainMenu.typeLeftContentShowing);

    return (
        <div className="body-left">
            <div className="body-left__before"></div>
            <BodyLeftHeader />
            <SearchBar />
            {typeLeftContentShowing === "conversations" && <Conversations />}
            {typeLeftContentShowing === "friends" && <Friends />}
        </div>
    );
}

export default memo(BodyLeft);