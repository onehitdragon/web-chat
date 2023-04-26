import { memo } from "react";
import styles from "./Home.module.css"

function FriendMenu({rows}){
    return (
        <div className={styles.friends}>
            {
                rows.map((row, index) => {
                    return (
                        <div key={index} className={styles.friend} onClick={() => { row.handleOnClick(); }}>
                            <span>{row.title}</span>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default memo(FriendMenu);