import { memo } from "react";
import styles from "./Home.module.css";

function FirstMenuItemNormal({row}){
    return (
        <div className={styles["menu-1__item"]}
            onClick={() => { row.handleOnClick() }}>
            {row.title}
        </div>
    );
}

export default memo(FirstMenuItemNormal);