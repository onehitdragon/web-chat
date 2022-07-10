import IconContent from "./IconContent";
import ImageContent from "./ImageContent";

function FileContent({url}){
    if(url.includes("/img/icons/")){
        return <IconContent src = {url}/>;
    }
    if(url.includes("/image/")){
        console.log("abc");
        return <ImageContent src = {url}/>;
    }
}

export default FileContent;