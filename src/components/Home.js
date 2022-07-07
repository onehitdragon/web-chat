import { createRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import doRequestApi from '../tools/doRequestApi';
import NormalConversation from './NormalConversation';
import './Home.css';
import ContentChatArea from './ContentChatArea';
import HeaderChatArea from './HeaderChatArea';
import InputChatArea from './InputChatArea';
import { v4 as uuidv4 } from "uuid";

const signalr = require('@microsoft/signalr');

function Home(){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [listConversation, setListConversation] = useState(null);
    const [you, setYou] = useState(null);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [connection, setConnection] = useState(null);
    const currentInputChatRef = createRef();

    useEffect(() => {
        doRequestApi('http://127.0.0.1:5001/home/index', 'GET')
        .then((data) => {
            console.log(data);
            if(data.error === 'nologin'){
                navigate('/');
            }
            else{
                setLoading(false);
                setListConversation(data.listConversation);
                setYou(data.you);
                setConnection(
                    new signalr.HubConnectionBuilder()
                        .withUrl('http://127.0.0.1:5001/chat')
                        .build()
                );
            }
        })
        .catch((e) => {
            console.log(e);
        });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if(connection != null){
            connection.start()
            .then(() => {
                connection.invoke('Init', JSON.stringify({
                    user: you,
                    listConversation: listConversation
                }));
            })
            .catch(e => {
                console.log(e);
            });

            connection.on("haveNewMessage", (netId, res) => {
                const conversation = JSON.parse(res);
                const newMessage = conversation.messages.at(-1);
                const conversationFound = listConversation.find(conversationItem => conversationItem.id === conversation.id);
                conversationFound.messages.push(newMessage);

                const sender = newMessage.sender;
                if(sender.id === you.id){
                    conversationFound.messages.find((message, index) => {
                        if(message.netId === netId){
                            // remove
                            conversationFound.messages.splice(index, 1);
                            return true;
                        }
                        return false;
                    });
                    newMessage.netId = netId;
                    newMessage.status = "success";
                }
                else{
                    if(conversationFound.scroll !== undefined){
                        conversationFound.scroll = -1;
                    }
                    conversationFound.amountMessageNotRead += 1;
                }
                
                setListConversation([...listConversation]);
            });

            connection.on("haveTyping", (res) => {
                receiveTypingFromServer(res, false);
            });
            connection.on("haveStopTyping", (res) => {
                receiveTypingFromServer(res, true);
            }); 
        }
        // eslint-disable-next-line
    }, [connection]);

    useEffect(() => {
        if(currentConversation !== null){
            currentInputChatRef.current.focus();
            clearAmountMessageNotRead();
        }
        // eslint-disable-next-line
    }, [currentConversation]);

    const sendTextMessage = (content) => {
        const newMessage = {
            content: content,
            createAt: new Date().toISOString(),
            fileAttachUrl: "",
            sender: you,
            typeMessage: 0,
            status: 'load'
        }
        sendMessageToServer(newMessage);
        currentConversation.scroll = undefined;
        currentConversation.messages.push(newMessage);
        setListConversation([...listConversation]);
    }

    const sendMessageToServer = (newMessage) => {
        const netId = uuidv4();
        connection.invoke('SendMessage', JSON.stringify({
            id: netId,
            idConversation: currentConversation.id,
            newMessage: newMessage
        }))
        .catch((e) => {
            console.log(e);
        });
        newMessage.netId = netId;
    }

    const handleScrollContentChat = (value) => {
        currentConversation.scroll = value;
    }

    const sendTypingToServer = (isSend = true) => {
        clearAmountMessageNotRead();
        return connection.invoke("Typing", currentConversation.id, isSend);
    }

    const receiveTypingFromServer = (res, isStop) => {
        const data = JSON.parse(res);
        const idConversation = data.idConversation;
        const idUser = data.idUser;
        const conversationFound = listConversation.find(conversationItem => conversationItem.id === idConversation);
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

        setListConversation([...listConversation]);
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
            setListConversation([...listConversation]);
        }
    }

    return (
        <div className="body">
            {   
                loading &&
                <div className="message-loading">
                    <div className="content">
                        <div className='content__mes'>
                            <p className="loading">
                                <i className="fa-solid fa-circle"></i>
                                <i className="fa-solid fa-circle"></i>
                                <i className="fa-solid fa-circle"></i>
                            </p>
                        </div>
                        <div className="name-time"></div>
                    </div>
                </div>
            }
            {
                !loading && 
                <div className="body__main-home">
                    <div className="body-left">
                        <div className="body-left__before"></div>
                        <div className="body-left__head">
                            <img className="avatar" src="https://cdn4.iconfinder.com/data/icons/game-of-thrones-4/64/game_of_thrones_game_thrones_series_character_avatar_ice_dragon-512.png" alt="error" />
                            <div className="name-area">
                                <p className="name">{you.lastName + ' ' + you.firstName}</p>
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
                            {listConversation != null && listConversation.map((conversation) => {
                                return conversation.participants.length <= 2 ? (
                                    <NormalConversation key = { conversation.id }
                                        infoConversation = { conversation }
                                        lastMessage = { conversation.messages.at(-1) }
                                        you = { you }
                                        setCurrentConversation = { setCurrentConversation }
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
                            sendTextMessage = { sendTextMessage }
                            sendTypingToServer = { sendTypingToServer }
                            ref= { currentInputChatRef }
                        />
                    </div>
                }
                </div>
            }
        </div>
    );
}

export default Home;