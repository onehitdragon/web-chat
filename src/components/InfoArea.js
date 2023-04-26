import { memo } from "react";
import styles from "./Home.module.css";

function InfoArea({title, contentLastMessage}){
    return (
        <div className={styles["info-area"]}>
            <div className={styles.name}>
                {title}
            </div>
            <div className={styles["last-mes"]}>
                {contentLastMessage}
            </div>
        </div>
    );
}

export default memo(InfoArea);