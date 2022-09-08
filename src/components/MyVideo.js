import { memo, useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";

function MyVideo(){
    const myVideoRef = useRef();
    const videoRef = useRef();
    const stream = useSelector(state => state.videoCall.stream);

    useEffect(() => {
        if(stream){
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <div className="myVideo" ref={myVideoRef}>
            <video ref={videoRef} autoPlay muted />
            {
                !stream &&
                <div className="controls controls--black" >
                    <span className="material-icons slash-video">videocam_off</span>
                </div>
            }
        </div>
    );
}

export default memo(MyVideo);