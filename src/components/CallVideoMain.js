import { memo, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "../style/callvideo.css";
import MyVideo from "./MyVideo";

function CallVideoMain(){
    const mainVideoRef = useRef();
    const otherVideoRef = useRef();
    const remoteStream = useSelector(state => state.videoCall.remoteStream);

    useEffect(() => {
        if(remoteStream){
            otherVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream])

    const handleOtherVideoOnLoad = (e) => {
        const video = e.target;
        mainVideoRef.current.style = `width: ${video.clientWidth}px; height: ${video.clientHeight}px`;
    }

    return (
        <div className='wrapper'>
            <div className="main-video" ref={mainVideoRef}>
                <video className="otherVideo" autoPlay muted
                    ref={otherVideoRef}
                    onLoadedMetadata={handleOtherVideoOnLoad}/>
                <MyVideo />
                <div className="controls" >
                    <div className="call-time">
                        <i className="fa-solid fa-record-vinyl"></i>
                        <span>01:40</span>
                    </div>
                    
                    <div className="controls-main">
                        <div className="volume__bar">
                            <div className="volume">
                                <i className="fa-solid fa-volume-xmark"></i>
                                <input type="range" min="0" max="100" value="0" onChange={() => {}}/>
                            </div>
                        </div>
                        <div className="controls-main__control">
                            <button name="zoom">
                                <i className="fa-solid fa-expand"></i>
                            </button>
                            <button name="mute">
                                <i className="fa-solid fa-microphone-slash"></i>
                            </button>
                            <button name="stop">
                                <i className="fa-solid fa-phone-flip"></i>
                            </button>
                            <button name="hide-camera">
                                <i className="fa-solid fa-video"></i>
                            </button>
                            <button name="setting">
                                <i className="fa-solid fa-desktop"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(CallVideoMain);