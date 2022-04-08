class VideoCallPopup{
    constructor(){
        console.log('https://dribbble.com/shots/14607971-KeyVue-video-calling-app');
        this.mediaStreamConstrain = {
            video: {
                width: window.innerHeight * 1.4,
                height: window.innerHeight * 0.8
            }
        }
    }
    createVideoCallPopupElement(){
        const videoCallContainerElement = document.createElement('div');
        videoCallContainerElement.className = 'main';
        videoCallContainerElement.innerHTML = `
            <div class="main__video-call">
                <div class="call-time">
                    <i class="fa-solid fa-record-vinyl"></i>
                    <span>03:15</span>
                </div>
                <video class='myVideo' autoplay muted></video>
                <div class="controls-main">
                    <div class="volume__bar">
                        <div class="volume">
                            <i class="fa-solid fa-volume-high"></i>
                            <i style="display: none;" class="fa-solid fa-volume-xmark"></i>
                            <input type="range">
                        </div>
                    </div>
                    <div class="controls-main__control">
                        <button name="zoom">
                            <i class="fa-solid fa-expand"></i>
                        </button>
                        <button name="mute">
                            <i class="fa-solid fa-microphone"></i>
                            <i style="display: none;" class="fa-solid fa-microphone-slash"></i>
                        </button>
                        <button name="stop">
                            <i class="fa-solid fa-phone-flip"></i>
                            <i style="display: none;" class="fa-solid fa-phone-slash"></i>
                        </button>
                        <button name="hide-camera">
                            <i class="fa-solid fa-video"></i>
                            <i style="display: none;"  class="fa-solid fa-video-slash"></i>
                        </button>
                        <button name="setting">
                            <i class="fa-solid fa-gear"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        const mainContainerElement = videoCallContainerElement.querySelector('.main__video-call');
        mainContainerElement.style = `width: ${this.mediaStreamConstrain.video.width}px; height: ${this.mediaStreamConstrain.video.height}px`;
        const myVideoElement = videoCallContainerElement.querySelector('video');
        navigator.mediaDevices.getUserMedia(this.mediaStreamConstrain).then((mediaStream) => {
            myVideoElement.srcObject = mediaStream;
            console.log(mediaStream);
        });

        return videoCallContainerElement;
    }
}
export default VideoCallPopup;