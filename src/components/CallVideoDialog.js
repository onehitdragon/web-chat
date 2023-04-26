import { memo } from "react";
import { useSelector } from "react-redux";
import styles from './Home.module.css';

function CallVideoDialog(){
    const callVieoDialog = useSelector(state => state.mainMenu.callVieoDialog);

    return (
        callVieoDialog.show &&
        <div className={styles.wrapper}>
            <div className={styles.dialog}>
                <div className={styles["info-area"]}>
                    <img className={styles.avatar} alt='error' src={callVieoDialog.friend.avatarUrl}/>
                    <p className={styles.name}>{callVieoDialog.friend.lastName + " " + callVieoDialog.friend.firstName}</p>
                    <p className={styles.status}>{callVieoDialog.status}</p>
                </div>
                <div className={styles["button-area"]}>
                    {callVieoDialog.buttons}
                </div>
            </div>
        </div>
    );
}

export default memo(CallVideoDialog);