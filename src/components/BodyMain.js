import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import ContentChatArea from './ContentChatArea';
import HeaderChatArea from './HeaderChatArea';
import InputChatArea from './InputChatArea';
import NormalConversation from './NormalConversation';
import { addNewMessage, selectConversations, selectCurrentConversaion, updateTyping } from "../features/chat/conversationsSlice";

function BodyMain(){
    const you = useSelector(state => state.you.info);
    const conversations = useSelector(selectConversations);
    const currentConversation = useSelector(selectCurrentConversaion);
    const dispatch = useDispatch();
    const socket = useSelector(state => state.socket);

    useEffect(() => {
        socket.invoke('Init', JSON.stringify({
            user: you,
            listConversation: conversations
        }));

        socket.on("haveNewMessage", (netId, res) => {
            const conversation = JSON.parse(res);
            const newMessage = conversation.messages.at(-1);
            dispatch(addNewMessage({
                idConversation: conversation.id,
                you: you,
                netId: netId,
                newMessage: newMessage
            }));
        });

        socket.on("haveTyping", (res) => {
            const data = JSON.parse(res);
            dispatch(updateTyping({
                idConversation: data.idConversation,
                idUser: data.idUser,
                typing: true
            }));
        });

        socket.on("haveStopTyping", (res) => {
            const data = JSON.parse(res);
            dispatch(updateTyping({
                idConversation: data.idConversation,
                idUser: data.idUser,
                typing: false
            }));
        });

        // eslint-disable-next-line
    }, []);
    
    return (
        <div className="body__main-home">
            <div className="body-left">
                <div className="body-left__before"></div>
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
                    <button className="menu-button">
                        <i className="fa-solid fa-ellipsis"></i>
                    </button>
                </div>
                <div className="body-left__search-bar">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder="Nhập nội dung tìm kiếm..." />
                    <p className="line"></p>
                </div>
                <div className="body-left__conversations">
                    {conversations !== null && conversations.map((conversation) => {
                        return conversation.participants.length <= 2 ? (
                            <NormalConversation key = { conversation.id }
                                infoConversation = { conversation }
                                lastMessage = { conversation.messages.at(-1) }
                                you = { you }
                                isChoice={ currentConversation != null && conversation.id === currentConversation.id }
                                amountMessageNotRead = { conversation.amountMessageNotRead }
                            />
                        ) : "";
                    })}
                </div>
            </div>
        {/* load chat area */}
        {   
            currentConversation != null &&
            <div className="body-right">
                <div className="body-right__before"></div>
                <HeaderChatArea title={currentConversation.title} />
                <ContentChatArea key={ currentConversation.id }/>
                <InputChatArea />
            </div>
        }
        </div>
    );
}

export default BodyMain;