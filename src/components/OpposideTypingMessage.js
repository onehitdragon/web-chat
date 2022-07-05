function OpposideTypingMessage(){
    return (
        <div className='message message-loading'>
            <img className="avatar" src="https://cdn4.iconfinder.com/data/icons/game-of-thrones-4/64/game_of_thrones_game_thrones_series_character_avatar_ice_dragon-512.png" alt='error'/>
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
    );
}

export default OpposideTypingMessage;