import { memo, useState } from "react";
import { useSelector } from "react-redux"
import BodyLeftMenu from "./BodyLeftMenu";
import styles from './Home.module.css';

function BodyLeftHeader(){
    const you = useSelector(state => state.you.info);
    const [showingMenu, setShowingMenu] = useState(false);

    return (
        <div className={styles["body-left__head"]}>
            <img className={styles.avatar} src={you.avatarUrl} alt="error" />
            <div className={styles["name-area"]}>
                <p className={styles.name}>{you !== null && (you.lastName + ' ' + you.firstName)}</p>
                <p className={styles.status}>
                    <i className={"fa-solid fa-circle"}></i>
                    <span> Trực tuyến</span>
                </p>
                <div className={styles["status-menu"]}>
                    <button type="button" name="online">
                        <i className={"fa-solid fa-circle " + styles["icon-status--green"]}></i>
                        <span>Trực tuyến</span>
                    </button>
                    <button type="button" name="offline">
                        <i className={"fa-solid fa-moon " + styles["icon-status--yellow"]}></i>
                        <span>Tạm vắng</span>
                    </button>
                    <button type="button" name="verybusy">
                        <i className={"fa-solid fa-circle-minus " + styles["icon-status--red"]}></i>
                        <span>Rất bận</span>
                    </button>
                </div>
            </div>
            <button className={styles["menu-button"]} onClick={() => { setShowingMenu(!showingMenu); }}>
                <i className={!showingMenu ? "fa-solid fa-ellipsis" : "fa-solid fa-xmark close"}></i>
            </button>
            <BodyLeftMenu isOpen={showingMenu}/>
        </div>
    );
}

export default memo(BodyLeftHeader);