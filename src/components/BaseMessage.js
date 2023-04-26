import { memo } from "react";
import { useSelector } from "react-redux";
import convertTimeToDisplay from "../tools/covertTimeToDisplay";
import HighLightSearchContent from "./HighLightSearchContent";
import styles from "./Home.module.css";

function BaseMessage({side = "left", sender, status = undefined, displayAvatar, displayTime, type, content, createAt}){
    const contentMessageKeyword = useSelector(state => state.search.contentMessageKeyword);
    let hide = false;
    let result;
    if(type === 0){
        result = content.toLowerCase().search(contentMessageKeyword.toLowerCase());
        if(result === -1){
            hide = true;
        }
    }

    return (
        !hide &&
        <div className={styles["message"] + " " + styles[side === "right" ? "message--mymessage" : ""]}>
            {displayAvatar && <img className={styles.avatar} alt="error" src="https://cdn4.iconfinder.com/data/icons/game-of-thrones-4/64/game_of_thrones_game_thrones_series_character_avatar_ice_dragon-512.png" />}
            {!displayAvatar && <div className={styles["placeholder-square"]}></div>}
            <div className={styles.content}>
                <div className={styles.content__mes}>
                    {
                        type === 0 && 
                        <div className={styles.text}>
                            {
                                <HighLightSearchContent content={content}
                                    startPos={result}
                                    amount={contentMessageKeyword.length} color="black"/>
                            }
                        </div>
                    }
                    {type === 1 && content}
                    {status === 'load' && <i className={styles["status-load fa-solid fa-circle-notch"]}></i>}
                    {status === 'success' && <i className={styles["status-success fa-solid fa-check"]}></i>}
                </div>
                {displayTime && <div className={styles["name-time"] + " " + styles["message--myname-time"]}>
                    <span className={styles.name}>{sender.lastName + " " + sender.firstName}</span>
                    <i className={styles["fa-solid fa-circle"]}></i>
                    <span className={styles.time}>{convertTimeToDisplay(createAt)}</span>
                </div>}
            </div>
        </div>
    );
}

export default memo(BaseMessage);