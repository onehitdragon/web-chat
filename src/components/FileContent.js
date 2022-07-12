import IconContent from "./IconContent";
import ImageContent from "./ImageContent";

function FileContent({message}){
    if(message.typeFile === "icon"){
        return <IconContent src = {message.src}/>;
    }
    if(message.typeFile === "image"){
        return <ImageContent src = {message.src}/>;
    }
}

export default FileContent;