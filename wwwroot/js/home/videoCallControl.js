import VideoCallPopup from './videoCallPopup.js';
import {mainElement} from '../init.js';
class VideoCallControl{
    constructor(){
        this.videoCallPopup = new VideoCallPopup();
        this.showVideoCallPopup();
    }
    showVideoCallPopup(){
        const videoCallPopupElement = this.videoCallPopup.createVideoCallPopupElement();
        mainElement.appendChild(videoCallPopupElement);
    }
}
export default VideoCallControl;