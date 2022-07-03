import { useState } from "react";
import MyMessage from './MyMessage';
import OpposideMessage from "./OpposideMessage";

function ChatArea({you, currentConversation}){
    const [listMessage, setListMessage] = useState(currentConversation.messages);

    const loadMessageNodes = () => {
        let previousId = -1;
        return listMessage.map((message, index) => {
            let sender = message.sender;
            let addTime = (listMessage[index + 1] === undefined || listMessage[index + 1].sender.id !== sender.id);
            if(you.id === sender.id){
                if(sender.id !== previousId){
                    previousId = sender.id;
                    return <MyMessage key={message.id} message={ message } displayAvatar={ true } displayTime={ addTime }/>
                }
                else{
                    return <MyMessage key={message.id} message={ message } displayAvatar={ false } displayTime={ addTime }/>
                }
            }
            else{
                if(sender.id !== previousId){
                    previousId = sender.id;
                    return <OpposideMessage key={message.id} message={ message } displayAvatar={ true } displayTime={ addTime }/>
                }
                else{
                    return <OpposideMessage key={message.id} message={ message } displayAvatar={ false } displayTime={ addTime }/>
                }
            }
        });
    }

    return (
        <div className="body-right">
                    <div className="body-right__before"></div>
                    <div className="body-right__head">
                        <img className="avatar" alt="error" src="https://cdn4.iconfinder.com/data/icons/game-of-thrones-4/64/game_of_thrones_game_thrones_series_character_avatar_ice_dragon-512.png" />
                        <div className="info-area">
                            <p className="name">{currentConversation.title}</p>
                            <p className="status">Đang gõ...</p>
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
                    <div className="body-right__messages">
                        { loadMessageNodes() }
                    </div>
                    <div className="body-right__send">
                        <button type="button" name="add-file">
                            <i className="fa-solid fa-circle-plus"></i>
                        </button>
                        <input type="text" placeholder="Nhập tin nhắn..." />
                        <button type="button" name="icon">
                            <i className="fa-solid fa-face-smile"></i>
                        </button>
                    </div>
                </div>
    );
}

export default ChatArea;