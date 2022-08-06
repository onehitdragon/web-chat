import { memo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function OtherVideo({setMaxWidth}){
    const otherVideoRef = useRef();
    const videoRef = useRef();
    const stream = useSelector(state => state.videoCall.remoteStream);
    const [aspect, setAspect] = useState(-1);

    useEffect(() => {
        videoRef.current.srcObject = stream;
    }, [stream])

    useEffect(() => {
        const calcMaxWidth = () => {
            if(aspect !== -1){
                if(window.innerWidth > window.innerHeight){
                    setMaxWidth((window.innerHeight - 50) / aspect);
                }
                else {
                    setMaxWidth((window.innerWidth - 50));
                }
            }
        }
        calcMaxWidth();
        window.addEventListener("resize", calcMaxWidth);

        return () => {
            window.removeEventListener("resize", calcMaxWidth);
        }
    }, [aspect, setMaxWidth]);

    const handleOtherVideoOnLoad = (e) => {
        const height = stream.getTracks()[1].getSettings().height;
        const width = stream.getTracks()[1].getSettings().width;
        otherVideoRef.current.style = `padding-top: ${height / width * 100}%`;
        setAspect(height / width);
    }

    return (
        <div className="otherVideo" ref={otherVideoRef}>
            <video autoPlay muted
                ref={videoRef}
                onLoadedMetadata={handleOtherVideoOnLoad}/>
        </div>
    );
}

export default memo(OtherVideo);