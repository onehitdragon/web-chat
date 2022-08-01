import { memo } from "react"

function Friends(){


    return (
        <div className="body-left__list">
            <div className="list-item">
                <div className="avatar-area">
                    <img className="avatar" src="/img/layout/default-avatar.jpg" alt="error"/>
                    <i className="fa-solid fa-circle icon-status--green"></i>
                </div>
                <div className="info-area">
                    <p className="name">Nguyễn B</p>
                    <div className="friends">
                        <div className="friend">
                            <span>Nhắn tin</span>
                        </div>
                        <div className="friend call">
                            <span>Gọi</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Friends);