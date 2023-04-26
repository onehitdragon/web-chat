import { memo } from "react";
import { useDispatch } from "react-redux";
import { updateConversationKeyword } from "../features/search/searchSlice";
import styles from "./Home.module.css";

function SearchBar(){
    const dispatch = useDispatch();

    return (
        <div className={styles["body-left__search-bar"]}>
            <i className={styles["fa-solid fa-magnifying-glass"]}></i>
            <input type="text" placeholder="Nhập nội dung tìm kiếm..."
                onChange={(e) => { dispatch(updateConversationKeyword(e.target.value)); }}/>
            <p className={styles.line}></p>
        </div>
    );
}

export default memo(SearchBar);