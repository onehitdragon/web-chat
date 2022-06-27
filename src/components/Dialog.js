function Dialog({srcImg, title, content, handleAgree, handleCancer}){
    return (
        <div id='message-popup'>
            <div className="container">
                <img src={srcImg} alt="error"></img>
                <p className="title">{title}</p>
                <p className="content">{content}</p>
                <div className="buttons">
                    <button type="button" onClick={handleAgree}>Đồng ý</button>
                    <button className="button--gray" onClick={handleCancer} type="button">Hủy</button>
                </div>
            </div>
        </div>
    );
}

export default Dialog;