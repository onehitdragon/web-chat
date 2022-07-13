import IconContent from "./IconContent";
import ImageContent from "./ImageContent";
import MusicContent from "./MusicContent";
import VideoContent from "./VideoContent";

function FileContent({message}){
    if(message.typeFile === "icon"){
        return <IconContent src = {message.src}/>;
    }
    if(message.typeFile === "image"){
        return <ImageContent src = {message.src}/>;
    }
    if(message.typeFile === "music"){
        return <MusicContent src = {message.src}/>;
    }
    if(message.typeFile === "video"){
        return <VideoContent src = {message.src}/>
    }
}

export default FileContent;