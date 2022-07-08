import convertTimeToDisplay from "../tools/covertTimeToDisplay";
import FileContent from "./FileContent";

function MyMessage({message, displayAvatar, displayTime}){
    const you = message.sender;
    const status = message.status;

    return (
        <div className="message message--mymessage">
            {displayAvatar && <img className="avatar" alt="error" src="https://cdn4.iconfinder.com/data/icons/game-of-thrones-4/64/game_of_thrones_game_thrones_series_character_avatar_ice_dragon-512.png" />}
            {!displayAvatar && <div className="placeholder-square"></div>}
            <div className="content">
                <div className="content__mes">
                    {message.typeMessage === 0 && <p>{message.content}</p>}
                    {message.typeMessage === 1 && <FileContent url={ message.fileAttachUrl }/>}
                    {status === 'load' && <i className="status-load fa-solid fa-circle-notch"></i>}
                    {status === 'success' && <i className="status-success fa-solid fa-check"></i>}
                </div>
                {displayTime && <div className="name-time message--myname-time">
                    <span className="name">{you.lastName + " " + you.firstName}</span>
                    <i className="fa-solid fa-circle"></i>
                    <span className="time">{convertTimeToDisplay(message.createAt)}</span>
                </div>}
            </div>
        </div>
    );
}

export default MyMessage;