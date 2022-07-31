import { memo } from "react";

function InfoArea({title, contentLastMessage}){
    return (
        <div className="info-area">
            <div className="name">
                {title}
            </div>
            <div className="last-mes">
                {contentLastMessage}
            </div>
        </div>
    );
}

export default memo(InfoArea);