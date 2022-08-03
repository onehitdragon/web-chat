import { memo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTypeLeftContentShowing, updateShowFriendSearchMain, updateShowCreationMain } from "../features/menu/mainMenuSlice";

let firstRender = true;

function BodyLeftMenu({isOpen}){
    const menuLeftRef = useRef();
    if(!isOpen){
        setTimeout(() => {
            menuLeftRef.current.className = "menu-left menu-left--closed";
        }, 250);
    }
    useEffect(() => {
        firstRender = false;
    }, []);
    const typeLeftContentShowing = useSelector(state => state.mainMenu.typeLeftContentShowing);
    const dispatch = useDispatch();
    const handleOnButtonFriendClick = () => {
        const type = typeLeftContentShowing === "friends" ? "conversations" : "friends";
        dispatch(updateTypeLeftContentShowing(type));
    }

    return (
        <div className={`menu-left menu-left--${firstRender ? "closed" : (isOpen ? "open" : "closing")}`}
            ref={menuLeftRef}>
            <div className="menu-main">
                <button name="friend" onClick={() => { handleOnButtonFriendClick() }}>
                    {
                        typeLeftContentShowing === "friends" ?
                        (<i className="fa-solid fa-comments"></i>) :
                        (<i className="fa-solid fa-user-group"></i>)
                    }
                </button>
                <button name="friend-search" onClick={() => { dispatch(updateShowFriendSearchMain(true)) }}>
                    <i className="fa-solid fa-user-plus"></i>
                </button>
                <button name="create-group" onClick={() => { dispatch(updateShowCreationMain(true)) }}>
                    <i className="fa-solid fa-users"></i>
                </button>
                <button name="setting">
                    <i className="fa-solid fa-gear"></i>
                </button>
                <button name="youtube">
                    <i className="fa-brands fa-youtube"></i>
                </button>
                <button name="discord">
                    <i className="fa-brands fa-discord"></i>
                </button>
            </div>
        </div>
    );
}

export default memo(BodyLeftMenu);