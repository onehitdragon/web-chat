import { memo, useEffect, useRef } from "react";
import { useState } from "react";
import styles from "./Home.module.css";

function HeaderChatArea({avatarUrl, title, status, type, menu, menuSearch}){
    let bodyRightHeadClassName = styles["body-right__head"];
    if(type === "group"){
        bodyRightHeadClassName += " " + styles["body-right__head--group"];
    }
    const conversationMenuRef = useRef();
    const conversationSearchMenuRef = useRef();
    const [showingMenu, setShowingMenu] = useState(false);
    const [showingSearchMenu, setShowingSearchMenu] = useState(false);
    
    useEffect(() => {
        const hide = (e) => {
            if(showingMenu && !conversationMenuRef.current.contains(e.target)){
                setShowingMenu(false);
            }
            if(showingSearchMenu && !conversationSearchMenuRef.current.contains(e.target)){
                setShowingSearchMenu(false);
            }
        }
        document.addEventListener("click", hide);
        return () => {
            document.removeEventListener("click", hide);
        }
    }, [showingMenu, showingSearchMenu]);

    return (
        <div className={bodyRightHeadClassName}>
            {avatarUrl !== undefined && <img className={styles.avatar} alt="error" src={avatarUrl} />}
            <div className={styles["info-area"]}>
                <p className={styles.name}>{title}</p>
                <p className={styles.status}>{status}</p>
            </div>
            <div className={styles["button-area"]}>
                <button type="button" name="profile" onClick={(e) => { e.stopPropagation(); setShowingSearchMenu(!showingSearchMenu); setShowingMenu(false);}}>
                    <i className={"fa-solid fa-magnifying-glass"}></i>
                </button>
                <button type="button" name="menu" onClick={(e) => { e.stopPropagation(); setShowingMenu(!showingMenu); setShowingSearchMenu(false);}}>
                    <i className={"fa-solid fa-ellipsis-vertical"}></i>
                </button>
                <div className={styles["conversation-menu"]} ref={conversationMenuRef}>
                    {showingMenu && menu}
                </div>
                <div className={styles["conversation-menu"] + " " + styles["conversation-menu--search"]} ref={conversationSearchMenuRef}>
                    {showingSearchMenu && menuSearch}
                </div>
            </div>
        </div>
    );
}

export default memo(HeaderChatArea);