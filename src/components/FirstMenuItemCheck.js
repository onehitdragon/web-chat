import { memo, useState } from "react";
import styles from "./Home.module.css";

function FirstMenuItemCheck({row}){
    const [checking, setChecking] = useState(row.checked);
    const handleOnItemClick = () => {
        setChecking(!checking);
        row.handleOnClick();
    }

    return (
        <div className={styles["menu-1__item"] + " " + styles["menu-1__item--checkbox"]}
            onClick={() => { handleOnItemClick() }}>
            <span>{row.title}</span>
            {checking ? <i className={"fa-solid fa-square-check"}></i> : <i className={"fa-regular fa-square-check"}></i>}
        </div>
    );
}

export default memo(FirstMenuItemCheck);