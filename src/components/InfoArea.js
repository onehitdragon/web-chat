import { memo } from "react";
import { useSelector } from "react-redux";
import HighLightSearchContent from "./HighLightSearchContent";

function InfoArea({title, contentLastMessage}){
    const keyword = useSelector(state => state.search.conversationKeyword);

    return (
        <div className="info-area">
            <div className="name">
                <HighLightSearchContent content={title} keyword={keyword} color="red"/>
            </div>
            <div className="last-mes">
                <HighLightSearchContent content={contentLastMessage} keyword={keyword} color="blue"/>
            </div>
        </div>
    );
}

export default memo(InfoArea);