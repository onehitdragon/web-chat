import { memo } from "react";
import { useSelector } from "react-redux";
import HighLightSearchContent from "./HighLightSearchContent";
import styles from "./Home.module.css";

function BaseFriend({friend, friendMenu}){
    const keyword = useSelector(state => state.search.conversationKeyword);
    const name = friend.lastName + " " + friend.firstName;
    const result = name.toLowerCase().search(keyword.toLowerCase());
    let show = true;
    if(result === -1){
        show = false;
    }

    return (
        show &&
        <div className={styles["list-item"]}>
            <div className={styles["avatar-area"]}>
                <img className={styles.avatar} src={friend.avatarUrl} alt="error"/>
                <i className={styles["fa-solid fa-circle icon-status--green"]}></i>
            </div>
            <div className={styles["info-area"] + " " + styles["info-area--friend"]}>
                <div className={styles.name}>
                    <HighLightSearchContent content={name} startPos={result} amount={keyword.length} color="red"/>
                </div>
                {friendMenu}
            </div>
        </div>
    );
}

export default memo(BaseFriend);