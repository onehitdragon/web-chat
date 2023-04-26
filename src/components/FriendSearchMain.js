import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateShowFriendSearchMain } from "../features/menu/mainMenuSlice";
import doRequestApi from "../tools/doRequestApi";
import FriendResults from "./FriendResults";
import styles from "./Home.module.css";

function FriendSearchMain(){
    const [keyword, setKeyword] = useState("");
    const [result, setResult] = useState([]);
    const dispatch = useDispatch();
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            if(keyword !== ""){
                doRequestApi(`/Friend/SearchFriend?key=${keyword}`, "GET")
                .then((data) => {
                    setResult(data);
                });
            }
        }, 750);
        return () => {
            clearTimeout(timeout);
        } 
    }, [keyword]);

    return (
        <div id={styles["friend-search-area"]}>
            <div className={styles["friend-search-main"]}>
                <div className={styles.title}>
                    <span>Thêm bạn</span>
                    <button name="close-friend-search"
                        onClick={() => { dispatch(updateShowFriendSearchMain(false)) }}>
                        <i className={"fa-solid fa-xmark"}></i>
                    </button>
                </div>
                <div className={styles["input-area"]}>
                    <div className={styles["input-area__search"]}>
                        <i className={"fa-solid fa-magnifying-glass"}></i>
                        <div className={styles.input}>
                            <input placeholder="Nhập tên, số điện thoại..." autoFocus
                            onChange={(e) => { setKeyword(e.target.value) }}/>
                        </div>
                        <FriendResults friends={result}/>
                        <i></i>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(FriendSearchMain);