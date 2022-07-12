function checkFileType(url){
    if(url === ""){
        return "text";
    }
    let extension = url.split(".").at(-1);
    extension = extension.toLowerCase();;
    if(extension === "png" || extension === "gif" || extension === "jpeg" || extension === "jpg"){
        if(url.includes("/img/icons/")){
            return "icon";
        }
        else{
            return "image";
        }
    }
    if(extension === "mp3"){
        return "music";
    }
    if(extension === "mp4"){
        return "video";
    }
    return "other";
}

export default checkFileType;