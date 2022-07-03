import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import doRequestApi from '../tools/doRequestApi';
import NormalConversation from './NormalConversation';
import './Home.css';

function Home(){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [listConversation, setListConversation] = useState(null);
    const [you, setYou] = useState(null);

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
            }
        })
        .catch((e) => {
            console.log(e);
        });
        // eslint-disable-next-line
    }, []);

    return (
        <div className="body">
            { loading && <div className="message-loading">
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
            </div> }
            { !loading && 
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
                                you = {you}/>
                            ) : "";
                        })}
                    </div>
                </div>
                <div className="body-right">
                    <div className="body-right__before"></div>
                    <div className="body-right__head">
                        <img className="avatar" alt="error" src="https://cdn4.iconfinder.com/data/icons/game-of-thrones-4/64/game_of_thrones_game_thrones_series_character_avatar_ice_dragon-512.png" />
                        <div className="info-area">
                            <p className="name">User Demo</p>
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
                        <div className="message">
                            <img className="avatar" alt="error" src="https://cdn4.iconfinder.com/data/icons/game-of-thrones-4/64/game_of_thrones_game_thrones_series_character_avatar_ice_dragon-512.png" />
                            <div className="content">
                                <div className="content__mes">
                                    <p>who is a hero</p>
                                </div>
                                <div className="content__mes">
                                    <p>who is a hero</p>
                                </div>
                                <div className="content__mes">
                                    <p>who is a hero dassssssssssssssssss</p>
                                </div>
                                <div className="name-time">
                                    <span className="name">User demo</span>
                                    <i className="fa-solid fa-circle"></i>
                                    <span className="time">9:30 PM</span>
                                </div>
                            </div>
                        </div>
                        <div className="message message--mymessage">
                            <img className="avatar" alt="error" src="https://cdn4.iconfinder.com/data/icons/game-of-thrones-4/64/game_of_thrones_game_thrones_series_character_avatar_ice_dragon-512.png" />
                            <div className="content">
                            <div className="content__mes">
                                    <p>who is a hero</p>
                                </div>
                                <div className="content__mes">
                                    <p>who is a hero</p>
                                </div>
                                <div className="content__mes">
                                    <p>who is a hero dassssssssssssssssss</p>
                                </div>
                                <div className="name-time message--myname-time">
                                    <i className="status-load fa-solid fa-circle-notch"></i>
                                    <span className="name">User demo</span>
                                    <i className="fa-solid fa-circle"></i>
                                    <span className="time">9:30 PM</span>
                                </div>
                            </div>
                        </div>
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
            </div> }
        </div>
    );
}

export default Home;