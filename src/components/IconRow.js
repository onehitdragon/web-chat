import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { sendIconMessage } from "../features/chat/conversationsSlice";
import styles from "./Home.module.css";

function IconRow({title, listIcon}){
    const [showing, setShowing] = useState(false);
    const dispatch = useDispatch();

    const handleIconClick = (icon) => {
        dispatch(sendIconMessage(icon));
    }

    return (
        <div className={styles["menu-row"]}>
            <div className={styles["menu-row__title"]} onClick={ () => { setShowing(!showing) } }>
                <p>{ title }</p>
                <i className={"fa-solid fa-angle-right " + (showing && "rotate90")}></i>
            </div>
            <div className={styles["menu-row__icons"]} style={{ display: showing ? "flex" : "none" }}>
                {
                    listIcon.map((icon, index) => {
                        return (
                            <div key={ icon }
                                className={styles["icon"] + " " + (index % 2 === 0 ? styles["icon--red"] : styles["icon--blue"])}
                                onClick = { () => { handleIconClick(icon); } }>
                                <img src={ "/img/icons/" + icon } alt="error"/>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default memo(IconRow);