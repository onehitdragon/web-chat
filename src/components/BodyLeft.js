import { memo } from "react";
import Conversations from "./Conversations";
import SearchBar from "./SearchBar";
import BodyLeftHeader from "./BodyLeftHeader";

function BodyLeft(){
    return (
        <div className="body-left">
            <div className="body-left__before"></div>
            <BodyLeftHeader />
            <SearchBar />
            <Conversations />
        </div>
    );
}

export default memo(BodyLeft);