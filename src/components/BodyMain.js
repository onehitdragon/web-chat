import { createRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import ContentChatArea from './ContentChatArea';
import HeaderChatArea from './HeaderChatArea';
import InputChatArea from './InputChatArea';
import doRequestApi from '../tools/doRequestApi';
import NormalConversation from './NormalConversation';
import { setScroll } from "../app/features/chat/currentConversationSlice";

function BodyMain(){
    const conversations = useSelector(state => state.conversations);
    const currentConversation = useSelector(state => state.currentConversation);
    const dispatch = useDispatch();
    const socket = useSelector(state => state.socket);
    const you = useSelector(state => state.you);
    const currentInputChatRef = createRef();

    useEffect(() => {
        if(socket !== null){
            socket.start()
            .then(() => {
                socket.invoke('Init', JSON.stringify({
                    user: you,
                    listConversation: conversations
                }));
            })
            .catch(e => {
                console.log(e);
            });

            socket.on("haveNewMessage", (netId, res) => {
                const conversation = JSON.parse(res);
                const newMessage = conversation.messages.at(-1);
                const conversationFound = conversations.find(conversationItem => conversationItem.id === conversation.id);

                const sender = newMessage.sender;
                if(sender.id === you.id){
                    conversationFound.messages.find((message) => {
                        if(message.netId === netId){
                            // replace
                            message.id = newMessage.id;
                            message.status = "success";
                            return true;
                        }
                        return false;
                    });
                }
                else{
                    const result = conversationFound.messages.find((message, index) => {
                        if(message.status === "load"){
                            // insert before
                            conversationFound.messages.splice(index, 0, newMessage);
                            return true;
                        }
                        return false;
                    });
                    if(result === undefined){
                        conversationFound.messages.push(newMessage);
                    }
                    if(conversationFound.scroll !== undefined){
                        conversationFound.scroll = -1;
                    }
                    conversationFound.amountMessageNotRead += 1;
                }
                
                dispatch({
                    type: "conversations/updateConversaions"
                });
            });

            socket.on("haveTyping", (res) => {
                receiveTypingFromServer(res, false);
            });
            socket.on("haveStopTyping", (res) => {
                receiveTypingFromServer(res, true);
            }); 
        }
        // eslint-disable-next-line
    }, [socket]);
    
    const receiveTypingFromServer = (res, isStop) => {
        const data = JSON.parse(res);
        const idConversation = data.idConversation;
        const idUser = data.idUser;
        const conversationFound = conversations.find(conversationItem => conversationItem.id === idConversation);
        const participants = conversationFound.participants;
        participants.find((participant) => {
            if(participant.id === idUser){
                isStop ? participant.typing = false : participant.typing = true;
                return true;
            }
            return false;
        });
        if(conversationFound.scroll !== undefined){
            conversationFound.scroll = -1;
        }

        dispatch({
            type: "conversations/updateConversaions"
        });
    }

    useEffect(() => {
        if(currentConversation !== null){
            currentInputChatRef.current.focus();
            dispatch({
                type: "conversations/updateConversaion",
                conversation: currentConversation
            });
            clearAmountMessageNotRead();
        }

        // eslint-disable-next-line
    }, [currentConversation]);

    const sendTypingToServer = (isSend = true) => {
        clearAmountMessageNotRead();
        return socket.invoke("Typing", currentConversation.id, isSend);
    }

    const clearAmountMessageNotRead = () => {
        if(currentConversation.amountMessageNotRead > 0){
            currentConversation.amountMessageNotRead = 0;
            doRequestApi('http://127.0.0.1:5001/home/UpdateAmountMessageNotRead', 'PUT', {
                contentType: 'application/x-www-form-urlencoded',
                body: `idConversation=${currentConversation.id}&idUser=${you.id}`
            })
            .then(data => {
                console.log(data);
            })
            
            dispatch({
                type: "conversations/updateConversaions"
            });
        }
    }

    const handleScrollContentChat = (value) => {
        dispatch(setScroll(value));
    }
    
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
                <ContentChatArea
                    you = { you }
                    listMessage = { currentConversation.messages }
                    scroll = { currentConversation.scroll }
                    handleScrollContentChat = { handleScrollContentChat }
                    listTypingOpposide = { currentConversation.participants.filter(participant => {
                        return participant.typing;
                    }) }
                />
                <InputChatArea
                    sendTypingToServer = { sendTypingToServer }
                    ref= { currentInputChatRef }
                />
            </div>
        }
        </div>
    );
}

export default BodyMain;