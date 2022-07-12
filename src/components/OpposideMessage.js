import convertTimeToDisplay from "../tools/covertTimeToDisplay";
import FileContent from "./FileContent";

function OpposideMessage({message, displayAvatar, displayTime}){
    const opposide = message.sender;

    return (
        <div className="message">
            {displayAvatar && <img className="avatar" alt="error" src="https://cdn4.iconfinder.com/data/icons/game-of-thrones-4/64/game_of_thrones_game_thrones_series_character_avatar_ice_dragon-512.png" />}
            {!displayAvatar && <div className="placeholder-square"></div>}
            <div className="content">
                <div className="content__mes">
                    {message.typeMessage === 0 && <p>{message.content}</p>}
                    {message.typeMessage === 1 && <FileContent  message = { message }/>}
                </div>
                {displayTime && <div className="name-time">
                    <span className="name">{opposide.lastName + " " + opposide.firstName}</span>
                    <i className="fa-solid fa-circle"></i>
                    <span className="time">{convertTimeToDisplay(message.createAt)}</span>
                </div>}
            </div>
        </div>
    );
}

export default OpposideMessage;