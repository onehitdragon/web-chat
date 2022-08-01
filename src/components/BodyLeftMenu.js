import { memo } from "react";

function BodyLeftMenu(){
    return (
        <div className="menu-left">
            <div className="menu-main">
                <button name="friend" className="">
                    <i className="fa-solid fa-user-group"></i>
                </button>
                <button name="friend-search" className="">
                    <i className="fa-solid fa-user-plus"></i>
                </button>
                <button name="create-group" className="">
                    <i className="fa-solid fa-users"></i>
                </button>
                <button name="setting" className="">
                    <i className="fa-solid fa-gear"></i>
                </button>
                <button name="youtube" className="">
                    <i className="fa-brands fa-youtube"></i>
                </button>
                <button name="discord" className="">
                    <i className="fa-brands fa-discord"></i>
                </button>
            </div>
        </div>
    );
}

export default memo(BodyLeftMenu);