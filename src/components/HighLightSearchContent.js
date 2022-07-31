import { memo } from "react";

function HighLightSearchContent({content, keyword, color = "red"}){
    let result = content.toLowerCase().search(keyword.toLowerCase());
    if(result === -1){
        return content;
    }
    else{
        return (
            <div>
                {content.substring(0, result)}
                {<span className={`search-highlight search-highlight--${color}`}>
                    {content.substring(result, result + keyword.length)}
                </span>}
                {content.substring(result + keyword.length, content.length)}
            </div>
        );
    }
}

export default memo(HighLightSearchContent);