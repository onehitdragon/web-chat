import { memo } from "react";

function HeaderChatArea({avatarUrl, title, status, bgColor}){
    let bodyRightHeadClassName = "body-right__head";
    if(bgColor === "group"){
        bodyRightHeadClassName += " body-right__head--group";
    }

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
                <button type="button" name="menu">
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>
            </div>
        </div>
    );
}

export default memo(HeaderChatArea);