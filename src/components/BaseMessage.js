import { memo } from "react";
import convertTimeToDisplay from "../tools/covertTimeToDisplay";
import HighLightSearchContent from "./HighLightSearchContent";

function BaseMessage({side = "left", sender, status = undefined, displayAvatar, displayTime, type, content, createAt}){
    return (
        <div className={`message ${side === "right" ? "message--mymessage" : ""}`}>
            {displayAvatar && <img className="avatar" alt="error" src="https://cdn4.iconfinder.com/data/icons/game-of-thrones-4/64/game_of_thrones_game_thrones_series_character_avatar_ice_dragon-512.png" />}
            {!displayAvatar && <div className="placeholder-square"></div>}
            <div className="content">
                <div className="content__mes">
                    {
                        type === 0 && 
                        <div className="text">
                            {
                                <HighLightSearchContent content={content} startPos={0} amount={1} color="black"/>
                            }
                        </div>
                    }
                    {type === 1 && content}
                    {status === 'load' && <i className="status-load fa-solid fa-circle-notch"></i>}
                    {status === 'success' && <i className="status-success fa-solid fa-check"></i>}
                </div>
                {displayTime && <div className="name-time message--myname-time">
                    <span className="name">{sender.lastName + " " + sender.firstName}</span>
                    <i className="fa-solid fa-circle"></i>
                    <span className="time">{convertTimeToDisplay(createAt)}</span>
                </div>}
            </div>
        </div>
    );
}

export default memo(BaseMessage);