import { memo, useState } from "react";
import "../style/callvideo.css";
import ControlCallVideo from "./ControlCallVideo";
import MyVideo from "./MyVideo";
import OtherVideo from "./OtherVideo";

function CallVideoMain(){
    const [maxWidth, setMaxWidth] = useState(0);

    return (
        <div className='wrapper'>
            <div className="main-video" style={{maxWidth: `${maxWidth}px`}}>
                <OtherVideo setMaxWidth={setMaxWidth}/>
                <MyVideo />
                <ControlCallVideo />
            </div>
        </div>
    );
}

export default memo(CallVideoMain);