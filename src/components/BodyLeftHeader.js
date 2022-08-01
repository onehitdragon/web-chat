import { memo, useState } from "react";
import { useSelector } from "react-redux"
import BodyLeftMenu from "./BodyLeftMenu";

function BodyLeftHeader(){
    const you = useSelector(state => state.you.info);
    const [showingMenu, setShowingMenu] = useState(false);

    return (
        <div className="body-left__head">
            <img className="avatar" src="https://cdn4.iconfinder.com/data/icons/game-of-thrones-4/64/game_of_thrones_game_thrones_series_character_avatar_ice_dragon-512.png" alt="error" />
            <div className="name-area">
                <p className="name">{you !== null && (you.lastName + ' ' + you.firstName)}</p>
                <p className="status">
                    <i className="fa-solid fa-circle"></i>
                    <span> Trực tuyến</span>
                </p>
                <div className="status-menu">
                    <button type="button" name="online">
                        <i className="fa-solid fa-circle  icon-status--green"></i>
                        <span>Trực tuyến</span>
                    </button>
                    <button type="button" name="offline">
                        <i className="fa-solid fa-moon  icon-status--yellow"></i>
                        <span>Tạm vắng</span>
                    </button>
                    <button type="button" name="verybusy">
                        <i className="fa-solid fa-circle-minus  icon-status--red"></i>
                        <span>Rất bận</span>
                    </button>
                </div>
            </div>
            <button className="menu-button" onClick={() => { setShowingMenu(!showingMenu); }}>
                <i className={!showingMenu ? "fa-solid fa-ellipsis" : "fa-solid fa-xmark close"}></i>
            </button>
            <BodyLeftMenu isOpen={showingMenu}/>
        </div>
    );
}

export default memo(BodyLeftHeader);