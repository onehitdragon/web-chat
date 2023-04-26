import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSearchInviteKeyword } from "../features/search/searchSlice";
import styles from "./Home.module.css";

function InviteFriendSearchBar(){
    const searchInviteKeyword = useSelector(state => state.search.searchInviteKeyword);
    const dispatch = useDispatch();

    return (
        <div className={styles["input-area__search"]}>
            <i className={"fa-solid fa-magnifying-glass"}></i>
            <div className={styles.input}>
                <input name="search-friend" placeholder="Thêm bạn vào nhóm..."
                    value={searchInviteKeyword}
                    onChange={(e) => { dispatch(updateSearchInviteKeyword(e.target.value)) }}/>
            </div>
            <p className={styles.line}></p>
            <i></i>
        </div>
    );
}

export default memo(InviteFriendSearchBar);