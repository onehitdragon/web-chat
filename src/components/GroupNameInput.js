import { memo } from "react";
import { useDispatch } from "react-redux";
import { updateNameGroup } from "../features/CreateGroup/createGroupSlice";
import styles from "./Home.module.css";

function GroupNameInput(){
    const dispatch = useDispatch();

    return (
        <div className={styles["input-area__search"]} style={{ marginBottom: "10px" }}>
            <i></i>
            <div className={styles.input}>
                <input name="name-group" placeholder="Nhập tên nhóm..." autoFocus
                    onChange={(e) => { dispatch(updateNameGroup(e.target.value))} }/>
            </div>
            <div className={styles["list-search"]}></div>
            <i></i>
        </div>
    );
}

export default memo(GroupNameInput);