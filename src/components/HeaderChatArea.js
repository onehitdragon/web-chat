function HeaderChatArea({title}){
    
    return (
        <div className="body-right__head">
            <img className="avatar" alt="error" src="https://cdn4.iconfinder.com/data/icons/game-of-thrones-4/64/game_of_thrones_game_thrones_series_character_avatar_ice_dragon-512.png" />
            <div className="info-area">
                <p className="name">{title}</p>
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
    );
}

export default HeaderChatArea;