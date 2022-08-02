import { memo } from "react"
import { useSelector } from "react-redux";
import Friend from "./Friend";

function Friends(){
    const friends = useSelector(state => state.friends.friends);

    return (
        <div className="body-left__list">
            <div className="list-header">
                <span className="list-header__title">Bạn bè ({friends.length})</span>
                <i className="fa-solid fa-angle-down"></i>
            </div>
            {
                friends.map((friend) => {
                    return (<Friend key={friend.id} friend={friend}/>);
                })
            }
        </div>
    )
}

export default memo(Friends);