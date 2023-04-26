import { memo, useState } from "react";
import styles from "../style/callvideo.module.css";
import ControlCallVideo from "./ControlCallVideo";
import MyVideo from "./MyVideo";
import OtherVideo from "./OtherVideo";

function CallVideoMain(){
    const [maxWidth, setMaxWidth] = useState(0);

    return (
        <div className={styles.wrapper}>
            <div className={styles["main-video"]} style={{maxWidth: `${maxWidth}px`}}>
                <OtherVideo setMaxWidth={setMaxWidth}/>
                <MyVideo />
                <ControlCallVideo />
            </div>
        </div>
    );
}

export default memo(CallVideoMain);