import { memo, useEffect, useRef } from "react";
import { useState } from "react";

function HeaderChatArea({avatarUrl, title, status, type, menu}){
    let bodyRightHeadClassName = "body-right__head";
    if(type === "group"){
        bodyRightHeadClassName += " body-right__head--group";
    }
    const conversationMenuRef = useRef();
    const [showingMenu, setShowingMenu] = useState(false);
    useEffect(() => {
        const hide = (e) => {
            if(showingMenu && !conversationMenuRef.current.contains(e.target)){
                setShowingMenu(false);
            }
        }
        document.addEventListener("click", hide);
        return () => {
            document.removeEventListener("click", hide);
        }
    }, [showingMenu]);

    return (
        <div className={bodyRightHeadClassName}>
            {avatarUrl !== undefined && <img className="avatar" alt="error" src={avatarUrl} />}
            <div className="info-area">
                <p className="name">{title}</p>
                <p className="status">{status}</p>
            </div>
            <div className="button-area">
                <button type="button" name="profile">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
                <button type="button" name="menu" onClick={(e) => { e.stopPropagation(); setShowingMenu(!showingMenu);}}>
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>
                <div className="conversation-menu" ref={conversationMenuRef}>
                    {showingMenu && menu}
                </div>
            </div>
        </div>
    );
}

export default memo(HeaderChatArea);