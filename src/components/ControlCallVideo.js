import { memo } from "react";

function ControlCallVideo(){
    return (
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
    );
}

export default memo(ControlCallVideo);