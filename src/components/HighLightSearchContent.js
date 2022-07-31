import { memo } from "react";

function HighLightSearchContent({content, startPos, amount, color = "red"}){
    if(startPos === -1){
        return content;
    }
    else{
        return (
            <div>
                {content.substring(0, startPos)}
                {<span className={`search-highlight search-highlight--${color}`}>
                    {content.substring(startPos, startPos + amount)}
                </span>}
                {content.substring(startPos + amount, content.length)}
            </div>
        );
    }
}

export default memo(HighLightSearchContent);