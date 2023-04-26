import { memo, useEffect, useRef } from "react";
import styles from "./Home.module.css";

function FirstMenuItemInput({row}){
    const inputRef = useRef();
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <div className={styles["menu-1__item--input"]}>
            <input type={"text"} placeholder={row.placeholder}
                ref={inputRef}
                value={row.value}
                onChange={(e) => row.handleOnInput(e.target.value)}/>
            {
                row.value !== "" &&
                <button className={styles["btn-close"]} onClick={() => { row.handleOnInput("")}}>
                    <i className={"fa-solid fa-circle-xmark"}></i>
                </button>
            }
        </div>
    );
}

export default memo(FirstMenuItemInput);